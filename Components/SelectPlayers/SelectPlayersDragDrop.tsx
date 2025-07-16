import React, { useState, useEffect } from 'react';
import {
	Dimensions,
	StyleSheet,
	View,
	Text,
	ScrollView,
	ImageBackground,
	ActivityIndicator,
	Heading,
	Alert,
	Platform,
} from 'react-native';
import {
	DraxProvider,
	DraxView,
	DraxSnapbackTargetPreset,
} from 'react-native-drax';
import { NativeBaseProvider, Center, PresenceTransition, Box, Button, HStack} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from "react-redux";
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import PositionTimes from '../../Util/PositionTimes.js';
const doubleright = <IconAnt name="doubleright" size={20} color="#fff" />;
const people = <Ionicons name="people" size={20} color="#fff" />;
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const handPointer = <FontAwesome name="hand-pointer-o" size={14} color="#fff" />;

import { getGamesData } from '../../Util/getGamesData.js';
import { getGamesDataOnce } from '../../Util/getGamesDataOnce.js';

import SelectPlayerStats from './SelectPlayerStats.js'
import SelectSeason from '../Setup/SelectSeason.js'
import SeasonPositionSortAll from '../PlayerStats/SeasonPositionSortAll.js'
import SelectPlayerTime from './SelectPlayerTime.js'
import SelectPlayerList from '../AddPlayers/SelectPlayerList.js'
import PositionSortNew from './PositionSortNew.js'
import AssignPlayerPositions from '../AddAiPositions/AssignPlayerPositions.js'


import { updateGames } from '../../Reducers/games';
import { updateTeamPlayers } from '../../Reducers/teamPlayers';
import { updatePlayerIndex } from '../../Reducers/playerIndex';
import { updateCheckSort } from '../../Reducers/checkSort';
import { updatePosArray } from '../../Reducers/posArray';
import { updateEventsVersion } from '../../Reducers/eventsVersion';
import { updatePositionEventFlag } from '../../Reducers/positionEventFlag';
import { updateSubSuggestions } from '../../Reducers/subSuggestions';

interface BoardPosition {
	row: number;
	column: number;
}

interface ChessSquareProps {
	width: number;
	position: BoardPosition;
	receptive: boolean;
}

const ChessSquare = ({ width, position, receptive, knightPosArray, playerIndexPos }: ChessSquareProps) => {
	const { row, column } = position;
	let colorStyle = (row % 2 === column % 2) ? styles.light : styles.dark;


	if (position.row === 7) {
			//console.log(position.row + ' position.row')
			//console.log(position.column + ' position.column')
			colorStyle = styles.absent
	}
	/*
	else if (position.row === 1 && position.column !== 0) {
		if (position.row === 1 && position.column !== 1) {
			colorStyle = styles.defender
		}
	}
	else if (position.row === 2 && position.column !== 0) {
		if (position.row === 2 && position.column !== 1) {
			colorStyle = styles.midfeild
		}
	}
	else if (position.row === 3 && position.column !== 0) {
		if (position.row === 3 && position.column !== 1) {
			colorStyle = styles.forward
		}
	}
	else if (position.column === 0 || position.column === 1 ) {
			 colorStyle = styles.sub
	}
	*/
	return (
		<DraxView
			style={[
				styles.square,
				colorStyle,
				receptive ? styles.receptive : undefined,
				{ width },
			]}
			receivingStyle={styles.receiving}
			receptive={receptive}
			onReceiveDragDrop={({ dragged: { payload } }) => {
				//console.log(JSON.stringify(payload) + ' what do i get with payload?')
				//console.log(JSON.stringify(position) + ' not sure what this deos?? 2')
				//console.log(playerIndexPos + ' playerIndexPos checking here.')
				const positionRow = position.row
				const positionColumn = position.column
				const positionIndex = knightPosArray.findIndex(x => x.indexId === playerIndexPos);
				//console.log(playerIndexPos)
				//console.log(positionIndex)
				knightPosArray[positionIndex].row = positionRow
				knightPosArray[positionIndex].column = positionColumn
				payload?.setKnightPosArray?.(knightPosArray);
				return DraxSnapbackTargetPreset.None;
			}}
		/>
	);
};

const SelectPlayersDragDrop = (props) => {

	const { navigate } = props.navigation;


	const [knightPosArray, setKnightPosArray] = useState<BoardPosition>([]);
	/*
	let knightPosArray
	let setKnightPosArray
	try {
		[knightPosArray, setKnightPosArray] = useState<BoardPosition>([]);
	}
	catch {
		[knightPosArray, setKnightPosArray] = useState([]);
	}
	*/
	const [moving, setMoving] = useState(false);
	const [isFirstGame, setIsFirstGame] = useState(false);
	const [initialLoad, setInitialLoad] = useState(true);
	const [playerIndex, setPlayerIndex] = useState(0);
	const [playerIndexPos, setPlayerIndexPos] = useState(0);
	const [playerPositionDisplayBoard, setPlayerPositionDisplayBoard] = useState(false);
	const [playerPositionDisplayBoardPlayerName, setPlayerPositionDisplayBoardPlayerName] = useState('');
	const [playerPositionDisplayBoardText, setPlayerPositionDisplayBoardText] = useState('');
	const [playerPositionDisplayBoardLatest, setPlayerPositionDisplayBoardLatest] = useState('');
	const [playerPositionOld, setPlayerPositionOld] = useState('');
	const [exitDrag, setExitDrag] = useState(true);
	const [animateLoading, setAnimateLoading] = useState(true);
	const [checkSortLive, setCheckSort] = useState(true);
	const [checkSortCount, setCheckSortCount] = useState(0);
	const [getLatestId, setLatestId] = useState(0);
	const [posts, setPosts] = useState();
	const [getGameDataReverse, setGameDataReverse] = useState([]);
	const [hasDifferentId, setHasDifferentId] = useState(false);
	const [idArray, setIdArray] = useState([]);
	const [getTestLoading, setTestLoading] = useState(0);


	let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let games = useSelector(state => state.games.games);
	let sixtySecondsMark = useSelector(state => state.stopwatch.sixtySecondsMark)
	let secondsElapsed = useSelector(state => state.stopwatch.secondsElapsed)
	let playerIndexReducer = useSelector(state => state.playerIndex.playerIndex)
	let seasonsDisplayId = useSelector(state => state.seasons.seasonsDisplayId);
	let checkSort = useSelector(state => state.checkSort.checkSort);
	let posArrayAll = useSelector(state => state.posArray.posArray);
	let posArrayReset = useSelector(state => state.posArray.posArrayReset);
	let gameBoardHideBtn = useSelector(state => state.gameBoardHideBtn.gameBoardHideBtn);
	const parentCoachView = useSelector(state => state.parentCoachView.parentCoachView);
	const userProfile = useSelector(state => state.userProfile.userProfile);
	let eventsVersion = useSelector(state => state.eventsVersion.eventsVersion);
	let fromContinueGame = useSelector(state => state.fromContinueGame.fromContinueGame);
	let positionEventFlag = useSelector(state => state.positionEventFlag.positionEventFlag);

	const whereFrom = props.whereFrom

  const dispatch = useDispatch()
	const { currentUser } = auth()
  let userRef = firestore().collection(currentUser.uid);
  try {
    if (userProfile === 4) {
      //console.log('profile 4 is hit!');
      //console.log(parentCoachView + ' parentCoachView ID is?');
      userRef = firestore().collection(parentCoachView);
    }
    else {
      userRef = firestore().collection(currentUser.uid);
    }
  }
  catch {
    //do nothing.
  }

	const formattedSeconds = (sec) =>
    Math.floor(sec / 60)

	const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

	/*
	useEffect(() => {

		//console.log('hit here into this 1');

		//console.log(props.whereFrom  + ' props.whereFrom hit here into this ');

		//console.log(props.sortPage  + ' props.sortPage hit here into this ');

		//console.log(props.checkSortLive  + ' checkSortLive hit here into this ');

		//console.log(checkSort  + ' checkSort hit here into this ');

		//console.log(JSON.stringify(props.posArray) + ' props.posArray checking again here.');
		//console.log(JSON.stringify(knightPosArray) + ' knightPosArray checking again here.');


		if (props.sortPage === true) {
			//console.log('hit here into this 2');
			setKnightPosArray(props.posArray)
		}


	},[checkSortLive])
	*/

/*
//THIS WAS THE FIRST DROP!
try {
	useEffect(() => {

			const checkSortLiveNew = checkSortLive + 1
			setCheckSort(checkSortLiveNew)
			const checkSortNew = checkSort + 1
			dispatch(updateCheckSort(checkSortNew))

	},[])
}
catch {
	//do nothing.
}
*/

	/*
	useEffect(() => {


			if (checkSort === 1 && checkSortCount === 0) {
				setCheckSortCount(1)
				getPosArrayStats()
			}


	},[checkSort])
	*/

	/*
	//THIS WAS THE second DROP!
try {
	useEffect(() => {

		getPosArrayStats()

		if (props.whereFrom === 1) {
			setIsFirstGame(false)
		}
		else {
			try {
				//console.log(games.length + ' what is games.length? 2');
	      if (games.length < 1) {
	      //console.log('hit open player?');
	        setIsFirstGame(true)
	      }
	      else {
	      //console.log('hit hide player?');
	        setIsFirstGame(false)
	      }
			}
			catch {

			}
		}

	},[])
}
catch {
	//do nothing.
}
*/

/*
//THIS WAS THE THIRD DROP!
try {
	useEffect(() => {

		getPosArrayStats()

	},[games[0].teamPlayers.length])
}
catch {
	//do nothing.
}
*/

useEffect(() => {

	let userRefId = null
		try {
			if (userProfile === 4) {
				//console.log('profile 4 is hit!');
				//console.log(parentCoachView + ' parentCoachView ID is?');
				userRefId = parentCoachView
			}
			else {
				userRefId = currentUser.uid
			}
		}
		catch {
			//do nothing.
		}

	//const unsubscribeGameData = getGamesData(dispatch, userProfile, parentCoachView, userRefId, eventsVersion);
	const unsubscribeGameData = getGamesData(dispatch, userProfile, parentCoachView, userRefId, eventsVersion, currentUser.uid);

	//console.log('we get hit ??');


	// 🧹 Cleanup function on unmount
	return () => {
		unsubscribeGameData();
	};
}, [dispatch]);


try {
	useEffect(() => {

		getPosArrayStats()

	},[sixtySecondsMark])
}
catch {
	//do nothing.
}

try {
useEffect(() => {

	console.log('are we hit! loadogin new page.');

	setTestLoading(1)
	setTimeout(function(){

			setTestLoading(0)

	}, 4000);

},[props.fromContinue, games[0].gameHalfTime, games[0].sixtySecondsMark])
}
catch {
	//do nothing.
}


useEffect(() => {

	console.log('at least tell me we are hitting here. 1');
	const getDataOnce = async () => {
		//console.log('at least tell me we are hitting here. 2');

		const gameIdDbNew = games[0].gameIdDb

		let gameData = []
		let gameDataReverse = []
		try {

			let userRefId = null
			try {
				if (userProfile === 4) {
					//console.log('profile 4 is hit!');
					//console.log(parentCoachView + ' parentCoachView ID is?');
					userRefId = parentCoachView
				}
				else {
					userRefId = currentUser.uid
				}
			}
			catch {
				//do nothing.
			}

			//console.log(' doe s this show 2 top');
			//console.log(userRefId + ' now it hsould display.!');

			const data = await getGamesDataOnce(userRefId); // <-- replace collection name
			//console.log(' doe s this show 3 top');

			//setPosts(data);
	 //console.log('getting here aye?');
	 //console.log(' doe s this show 4 top');

			data.map(game => {
				//console.log(' doe s this show 5 top');
		 //console.log(JSON.stringify(game) + ' what do we have in here?');

				try {
					//console.log(' doe s this show 5.5 top');
					if (game.game.isGame === true) {
						//console.log(game.game.id + ' game id t4esting only');
						//console.log(' doe s this show 6 top');
						gameData.push(game.game)
					 }
				 }
				 catch {
					 //console.log(' doe s this show 7 top');
				 }


			 })
			 //console.log(' doe s this show 8 top');

		 const gameDataIdOrder = gameData.sort((a, b) => a.id - b.id);
		 gameDataReverse = gameDataIdOrder.reverse();
		 setGameDataReverse(gameDataReverse)
	 	}
		catch {
			//console.log('issue with the above top useEffect');
		}

		let posArrayAllGetLatestGame = []

					try {
						gameDataReverse[0].teamPlayers.map(player => {
							try {
								posArrayAllGetLatestGame.push(player.positionDetails)
								//dipatchPosChange(player, playerPos.currentPosition)
							}
							catch {
								//console.log('maybe hitting this here aye?');

								//no position details
							}
						})
						//console.log(JSON.stringify(posArrayAllGetLatestGame) + ' posArrayAllGetLatestGame what??? getLatestPos ');
						setKnightPosArray(posArrayAllGetLatestGame)

						//positionBoxDisplays(playerTempNew)
					}
					catch {
						//nothing.
					}



					setLatestId(games[0].latestUpdateUid)

	}

	getDataOnce()
	//getAvgTimePerPlayer()


},[eventsVersion])

try {
	useEffect(() => {



		try {
		const playerIndexRaw = games[0].teamPlayers.findIndex(x => x.id === playerIndexPos);
		const currentPosition = games[0].teamPlayers[playerIndexRaw].currentPosition
		let currentPosText = ''
		if (currentPosition === 'gol') {
			currentPosText = 'goalie'
		}
		else if (currentPosition === 'def') {
			currentPosText = 'defender'
		}
		else if (currentPosition === 'mid') {
			currentPosText = 'midfield'
		}
		else if (currentPosition === 'fwd') {
			currentPosText = 'forward'
		}
		else if (currentPosition === 'abs') {
			currentPosText = 'absent/not playing'
		}
		else {
			currentPosText = 'substitute'
		}
		setPlayerPositionDisplayBoardLatest(currentPosText);
	}
	catch {
		//do nothing.
	}

})
}
catch {
	//do nothing.
}

try {
useEffect(() => {

	//console.log(JSON.stringify(games[0]) + ' check here berfore to moving on next');
	try {
	var result = games[0].teamPlayers.reduce((retArr, item) => {
	  // condition to avoid duplication
		//console.log('i need to check form here ok.');

		//console.log(JSON.stringify(retArr) + ' retArr what the');
		//console.log(JSON.stringify(item) + ' item what the');

	  if (!retArr.includes(item)) {
	    var filteredArr = games[0].teamPlayers.filter((i) => {
	      return i.positionDetails.row === item.positionDetails.row && i.positionDetails.column === item.positionDetails.column;
	    });
	    if (filteredArr.length > 1) retArr = [...retArr, ...filteredArr];
	  }
	  return retArr;
	}, []);
	//console.log(JSON.stringify(result) + ' result test')

	let playerTemp = []

	if (result.length > 0) {
		//console.log(JSON.stringify(result) + ' hit, do something!')
		const playerIndexRaw = games[0].teamPlayers.findIndex(x => x.id === result[1].id);
		let playerRowTemp = result[0].positionDetails.row
		let playerIndexIdTemp = result[0].positionDetails.indexId
		playerRowTemp++
		playerIndexIdTemp++
		//console.log(JSON.stringify(games[0].teamPlayers[playerIndexRaw].positionDetails.row) + ' test to see if change.? 1')
		games[0].teamPlayers[playerIndexRaw].positionDetails.row = 6
		games[0].teamPlayers[playerIndexRaw].positionDetails.column = 7
		//games[0].teamPlayers[playerIndexRaw].positionDetails.indexId = playerIndexIdTemp
		//console.log(JSON.stringify(games[0].teamPlayers[playerIndexRaw].positionDetails.row) + ' test to see if change.? 2')


		const knightPosArrayIndexRaw = knightPosArray.findIndex(x => x.playerName === result[0].playerName);

		knightPosArray[playerIndexRaw].row = 6
		knightPosArray[playerIndexRaw].column = 7

		dispatch(updateGames(games))
		setKnightPosArray(knightPosArray)
		//dispatch(updatePosArray(knightPosArray, knightPosArray))
	}
}
catch {
	//console.log('ok, hitting catch.');

	//do nothing.
}

},[eventsVersion])
}
catch {
	//do nothing.
}

/*
try {
	useEffect(() => {

		//console.log(props.checkSortLive  + ' checkSortLive hit here into this ');
		//console.log(props.showNewScreen  + ' showNewScreen hit here into this ');

		//console.log(JSON.stringify(posArrayAll) + ' posArrayAll checking again here.');
		//console.log(JSON.stringify(knightPosArray) + ' knightPosArray checking again here.');

		if (props.showNewScreen === false && checkSortLive > 0) {
			setKnightPosArray(posArrayAll)
		}
		else if (props.showNewScreen === false && checkSortLive <= 0) {
			setKnightPosArray(posArrayReset)
		}


	},[props.checkSortLive])
}
catch {
	//do nothing.
}
*/


try {
useEffect(() => {

	/*
	let _games = []
	try {
		_games = [...games]
	}
	catch {
		_games = [{...games}]
	}

	console.log(_games[0].teamPlayers + ' _games[0].teamPlayers');


	if (props.fromContinue === 0 && secondsElapsed <= 0) {

		let newPlayerPos = []
		let playerCount = 0


		_games[0].teamPlayers.map(player => {

				switch(playerCount) {
					case 0:
						//console.log('hit 0');
						player.positionDetails.row = 4
						player.positionDetails.column = 1
						playerCount++
						break;
					case 1:
						//console.log('hit 1');
						player.positionDetails.row = 4
						player.positionDetails.column = 2
						playerCount++
						break;
					case 2:
						//console.log('hit 2');
						player.positionDetails.row = 4
						player.positionDetails.column = 3
						playerCount++
						break;
					case 3:
						player.positionDetails.row = 4
						player.positionDetails.column = 4
						playerCount++
						break;
					case 4:
						player.positionDetails.row = 4
						player.positionDetails.column = 5
						playerCount++
						break;
					case 5:
						player.positionDetails.row = 4
						player.positionDetails.column = 6
						playerCount++
						break;
					case 6:
						player.positionDetails.row = 4
						player.positionDetails.column = 7
						playerCount++
						break;
					case 7:
						player.positionDetails.row = 5
						player.positionDetails.column = 1
						playerCount++
						break;
					case 8:
						player.positionDetails.row = 5
						player.positionDetails.column = 2
						playerCount++
						break;
					case 9:
						player.positionDetails.row = 5
						player.positionDetails.column = 3
						playerCount++
						break;
					case 10:
						player.positionDetails.row = 5
						player.positionDetails.column = 4
						playerCount++
						break;
					case 11:
						player.positionDetails.row = 5
						player.positionDetails.column = 5
						playerCount++
						break;
					case 12:
						player.positionDetails.row = 5
						player.positionDetails.column = 6
						playerCount++
						break;
					case 13:
						player.positionDetails.row = 5
						player.positionDetails.column = 7
						playerCount++
						break;
					case 14:
						player.positionDetails.row = 6
						player.positionDetails.column = 1
						playerCount++
							break;
					case 15:
						player.positionDetails.row = 6
						player.positionDetails.column = 2
						playerCount++
							break;
					case 16:
						player.positionDetails.row = 6
						player.positionDetails.column = 3
						playerCount++
							break;
					case 17:
						player.positionDetails.row = 6
						player.positionDetails.column = 4
						playerCount++
						break;
					case 18:
						player.positionDetails.row = 6
						player.positionDetails.column = 5
						playerCount++
						break;
					case 19:
						player.positionDetails.row = 6
						player.positionDetails.column = 6
						playerCount++
						break;
					case 20:
						player.positionDetails.row = 6
						player.positionDetails.column = 7
						playerCount++
						break;
					case 21:
						player.positionDetails.row = 4
						player.positionDetails.column = 0
						playerCount++
						break;
					case 22:
						player.positionDetails.row = 4
						player.positionDetails.column = 8
						playerCount++
						break;
					case 23:
						player.positionDetails.row = 5
						player.positionDetails.column = 0
						playerCount++
						break;
					case 24:
						player.positionDetails.row = 5
						player.positionDetails.column = 8
						playerCount++
						break;
					case 25:
						player.positionDetails.row = 6
						player.positionDetails.column = 0
						playerCount++
						break;
					case 26:
						player.positionDetails.row = 6
						player.positionDetails.column = 8
						playerCount++
						break;
					default:
						player.positionDetails.row = 6
						player.positionDetails.column = 8
						playerCount++
			}


			newPlayerPos.push({ row: player.positionDetails.row, column: player.positionDetails.column, indexId: player.positionDetails.indexId, initials: player.positionDetails.initials, gameTimeStats: '', playerName: player.playerName })


		})

		const gamesNew = _games
		dispatch(updateGames(gamesNew))
		*/
		//console.log(posArrayAll + ' posArrayAll is whhhat?');
		//console.log(sixtySecondsMark + ' what is sixtySecondsMark here ok??');

		if (sixtySecondsMark <= 0) {
			setKnightPosArray(posArrayAll)
		}

	//}




},[posArrayAll.length])
}
catch {
	//do nthhing.
}






	const getPosArrayStats = () => {

		//to do.
		let _games = []
		try {
			_games = [...games]
		}
		catch {
			_games = [{...games}]
		}
		console.log(JSON.stringify(_games[0].teamPlayers) + ' _games.teamPlayers try')
		const teamplayersGame = _games[0].teamPlayers
		//console.log(JSON.stringify(_games) + ' _games what is?')
		//console.log(_games[0].teamPlayers + ' _games.teamPlayers')

		//positionDetails: { row: 0, column: 0, indexId: 0, initials: '', gameTimeStats: '' }
		let posArray = []
		let countSubCheck = 0
		try {
		teamplayersGame.map(player => {
			let playerPosDetailsArray = []
			playerPosDetailsArray.push({ row: 0, column: 0, indexId: 0, initials: '', gameTimeStats: '', playerName: '' })
			//console.log(JSON.stringify(posArray) + 'posarray hit in here 0.')
			const posArrayLength = posArray.length
			//console.log(posArrayLength + ' posArrayLength hit in here 0.')
			let positionDetailsRow = 0
			let positionDetailsColumn = 0
			let indexId = 0
			let initials = ''
			let gameTimeStats = ''
			//console.log(_games.gameSetup + ' _games[0].gameSetup hit in here 0')
			if (posArrayLength > 0 && _games[0].gameSetup === true) {
				//console.log('hit in here 1')
				const prevPlayerIndex = posArrayLength - 1
				//console.log(JSON.stringify(prevPlayerIndex) + ' prevPlayerIndex hit in here 1')
				//console.log(JSON.stringify(posArray) + ' posArray hit in here 1')
				//console.log(posArray[prevPlayerIndex].row + ' posArray[prevPlayerIndex].row hit in here 1')
				let prevPlayerRow = 0
				let prevPlayerColumn = 0
				prevPlayerRow = posArray[prevPlayerIndex].row
				prevPlayerColumn = posArray[prevPlayerIndex].column
				//console.log(JSON.stringify(knightPosArray) + ' knightPosArray need to check here ok.')
				const positionIndex = knightPosArray.findIndex(x => x.indexId === player.id);
				//console.log(player.id + ' player.id for checking already set')
				//console.log(positionIndex + ' positionIndex for checking already set')

				let positionRow = 0
				let positionColumn = 0
				try {
					positionRow = knightPosArray[positionIndex].row
					positionColumn = knightPosArray[positionIndex].column
				}
				catch {
					//console.log('oh no. hit catch.')
					positionRow = 0
					positionColumn = 0
				}

				//console.log(positionRow + ' positionRow hmm')
				//console.log(positionColumn + ' positionColumn hmm')

				if (positionRow < 4 && positionColumn > 1) {
					playerPosDetailsArray[0].row = positionRow
					playerPosDetailsArray[0].column = positionColumn
				}
				else {
					/*
					const knightsStillSubs = knightPosArray.map(player => {

						if ((player.row > 4) || (player.row < 4 && player.column < 1)) {
							return player
						}

					})
					*/

					//console.log(JSON.stringify(player) + ' player hmm')
					//console.log(player.initials + ' player.initials hmm')
					//console.log(player.row + ' player.row hmm')
					//console.log(player.column + ' player.column hmm')

					if (initialLoad === false) {

						let highestSubs = []

					const knightsStillSubs = knightPosArray.reduce(function(acc, cur) {
						if ((cur.row >= 4) || (cur.row < 4 && cur.column <= 1)) {
							//return player
							acc.push(cur);
						}
					  return acc;
					}, []);

					//console.log(JSON.stringify(knightsStillSubs) + ' knightsStillSubs hmm')

					let knightsStillSubsLowest = []

					if (knightsStillSubs !== null || knightsStillSubs !== [] || knightsStillSubs.length > 0) {

						try {
							knightsStillSubsLowest = knightsStillSubs.reduce((prev, curr) => prev.row >= curr.row ? prev : curr);
							//console.log(knightsStillSubsLowest.row + 'knightsStillSubsLowest.column here.')
							//prevPlayerColumn = knightsStillSubsLowest.column
							//prevPlayerRow = knightsStillSubsLowest.row
						}
						catch {
							//console.log('oh, we went in here 1.')
							//prevPlayerColumn = 0
							//prevPlayerRow = 0
						}

						//console.log(JSON.stringify(knightsStillSubsLowest) + ' knightsStillSubsLowest chky here.')
						//console.log(knightsStillSubsLowest.row + ' knightsStillSubsLowest.row  here.')

						const subHighestRow = knightsStillSubsLowest.row

						highestSubs.push(knightsStillSubsLowest)
						let subsOnSameRow = []
						try {
						subsOnSameRow = knightsStillSubs.reduce(function(acc, cur) {
							if (cur.row === subHighestRow) {
								//return player
								acc.push(cur);
							}
						  return acc;
						}, []);
						}
						catch {
							//console.log('oh, we went in here 1a.')
								//do nothing.
						}

						//console.log(JSON.stringify(subsOnSameRow) + ' subsOnSameRow chky here.')

						let subWithHighestColumn = []

						try {
							subWithHighestColumn = subsOnSameRow.reduce((prev, curr) => prev.column > curr.column ? prev : curr);
							//console.log(subWithHighestColumn.row + 'subWithHighestColumn.row here.')
							//console.log(subWithHighestColumn.column + 'subWithHighestColumn.column here.')
							prevPlayerColumn = subWithHighestColumn.column
							prevPlayerRow = subWithHighestColumn.row
							//prevPlayerColumn = knightsStillSubsLowest.column
							//prevPlayerRow = knightsStillSubsLowest.row
							//countSubCheck++
						}
						catch {
							//console.log('oh, we went in here 2.')
							//prevPlayerColumn = 0
							//prevPlayerRow = 0
						}

						//console.log(JSON.stringify(subWithHighestColumn) + ' subWithHighestColumn chky here.')

					}

				}

				let maxId = 0

				try {
				maxId = knightPosArray.reduce(function(prev, current) {
    			return (prev && prev.indexId > current.indexId) ? prev : current
				})
			}
			catch {
				// do nothing.
			}

				//console.log(JSON.stringify(maxId) + ' maxId is what?')
				//console.log(maxId.indexId + ' maxId.indexId is what?')
				//console.log(player.id + ' player.id is what?')
				//console.log(player.playerName + ' player.playerName is what?')
				//console.log(initialLoad + ' initialLoad is what?')

				const knightsStillSubs = knightPosArray.reduce(function(acc, cur) {
					if ((cur.row >= 4) || (cur.row < 4 && cur.column <= 1)) {
						//return player
						acc.push(cur);
					}
					return acc;
				}, []);

				//console.log(JSON.stringify(knightsStillSubs) + ' knightsStillSubs is what here?')


					if (maxId.indexId >= player.id && initialLoad === false) {
						//console.log('Should mostly hit in here?')
						//positionDetailsRow = knightPosArray[positionIndex].row
						//positionDetailsColumn = knightPosArray[positionIndex].column
						playerPosDetailsArray[0].row = knightPosArray[positionIndex].row
						playerPosDetailsArray[0].column = knightPosArray[positionIndex].column
						//do nothing
					}
					else if ((knightsStillSubs.length <= 0 && initialLoad === false) || (knightsStillSubs === [] && initialLoad === false)) {
						//console.log('how the are you getting in here?')
						playerPosDetailsArray[0].row = 0
						playerPosDetailsArray[0].column = 0
					}
					else {

				if (prevPlayerColumn === 1 & prevPlayerRow < 4) {
					//console.log('hit in here 2')
					positionDetailsRow = prevPlayerRow + 1
					positionDetailsColumn = 0
				}
				else if (prevPlayerColumn === 8 & prevPlayerRow > 3) {
					//console.log('hit in here 3')
					positionDetailsRow = prevPlayerRow + 1
					positionDetailsColumn = 0
					//countSubCheck = 0
				}
				else if (prevPlayerColumn === 0 & prevPlayerRow < 4) {
					//console.log('hit in here 4')
					//console.log(prevPlayerRow + ' prevPlayerRow what is 1?')
					//console.log(prevPlayerColumn + ' prevPlayerColumn what is 1?')
					positionDetailsRow = prevPlayerRow
					positionDetailsColumn = 1
					//console.log(positionDetailsRow + ' positionDetailsRow what is 1?')
					//console.log(positionDetailsColumn + ' positionDetailsColumn what is 1?')
				}
				else {
					//console.log('hit in here 5')
					//console.log(prevPlayerRow + ' prevPlayerRow what is?')
					//console.log(prevPlayerColumn + ' prevPlayerColumn what is?')
					positionDetailsRow = prevPlayerRow
					positionDetailsColumn = prevPlayerColumn + 1
					//console.log(positionDetailsRow + ' positionDetailsRow what is?')
					//console.log(positionDetailsColumn + ' positionDetailsColumn what is?')
				}
				//console.log(playerPosDetailsArray + ' playerPosDetailsArray what is?')
				playerPosDetailsArray[0].row = positionDetailsRow
				playerPosDetailsArray[0].column = positionDetailsColumn
				//console.log(JSON.stringify(playerPosDetailsArray) + ' playerPosDetailsArray check here.')
			}

			}
			}
			else if (posArrayLength === 0 && _games[0].gameSetup === true) {
				if (initialLoad === false && knightPosArray.length > 0) {
					const positionIndex = knightPosArray.findIndex(x => x.indexId === player.id);
					playerPosDetailsArray[0].row = knightPosArray[positionIndex].row
					playerPosDetailsArray[0].column = knightPosArray[positionIndex].column
				}
				else {
					playerPosDetailsArray[0].row = 0
					playerPosDetailsArray[0].column = 0
				}
			}
			else {
				//console.log('i assume im hitting here.');

				/*
				//console.log(JSON.stringify(knightPosArray) + ' posArray what do i have in here?')
				//console.log(JSON.stringify(knightPosArray[posArrayLength]) + ' posArray[posArrayLength] stuffed it all up')
				playerPosDetailsArray = knightPosArray[posArrayLength]
				//console.log('hit in here 6')
				//console.log(JSON.stringify(player) + ' player what is?')
				//console.log(JSON.stringify(player.positionDetails) + ' player.positionDetails what is?')
				//console.log(JSON.stringify(player.positionDetails.row) + ' player.positionDetails.row what is?')
				//console.log(JSON.stringify(player.positionDetails.column) + ' player.positionDetails.column what is?')
				positionDetailsRow = player.positionDetails.row
				positionDetailsColumn = player.positionDetails.column
				//console.log(positionDetailsColumn + ' positionDetailsColumn what is?')
				//console.log(positionDetailsRow + ' positionDetailsRow what is?')
				//console.log(JSON.stringify(playerPosDetailsArray) + ' playerPosDetailsArray what do i see?')
				playerPosDetailsArray.row = positionDetailsRow
				playerPosDetailsArray.column = positionDetailsColumn
				*/
				playerPosDetailsArray = []
				//console.log(JSON.stringify(player.positionDetails) + ' player.positionDetails checking over her now..');
				playerPosDetailsArray.push(player.positionDetails)
			}

			if (_games[0].gameSetup === true) {
				//console.log(player.id + ' player.id')
				indexId = player.id
				playerPosDetailsArray[0].indexId = indexId
				initials = player.playerName.match(/\b(\w)/g);
				playerPosDetailsArray[0].initials = initials
				//console.log(player.playerName + ' player.playerName hey!');
				playerPosDetailsArray[0].playerName = player.playerName
			}

			//Game time stats to do.

			gameTimeStats = player.positionDetails.gameTimeStats
			playerPosDetailsArray.gameTimeStats = gameTimeStats


			//console.log(JSON.stringify(playerPosDetailsArray) + ' playerPosDetailsArray')
			posArray.push(playerPosDetailsArray[0])
		})
		}
		catch {
			//nothing
		}

		//console.log(JSON.stringify(posArray) + ' posArray')
		setKnightPosArray(posArray)
		setInitialLoad(false)

	}

	const { width, height } = Dimensions.get('window');
	const boardWidth = Math.min(width, height) * 0.89;
	/*
	let squareWidth = 0;
	if (Platform.OS !== 'ios') {
			squareWidth = boardWidth / 8.5;
	}
	else {
			squareWidth = boardWidth / 8;
	}
	*/
	const squareWidth = boardWidth / 8;

	//console.log(squareWidth + ' what is squareWidth?')
	const rowViews: JSX.Element[] = [];

	for (let row = 0; row < 8; row += 1) {
		const squareViews: JSX.Element[] = [];
		for (let column = 0; column < 9; column += 1) {
			squareViews.push((
				<ChessSquare
					width={squareWidth}
					key={`r${row}c${column}`}
					position={{ row, column }}
					knightPosArray={knightPosArray}
					playerIndexPos={playerIndexPos}
				/>
			));
		}
		rowViews.push((
			<View key={`r${row}`} style={styles.row}>{squareViews}</View>
		));
	}

	/*
	const checkAndStoreId = (newId) => {
    setIdArray(prevArray => {
      if (prevArray.length === 0) {
        return [newId];
      }

      if (!prevArray.includes(newId)) {
        setHasDifferentId(true);
      }

      return [...prevArray, newId];
    });
  };

	const getAvgTimePerPlayer = () => {

    //console.log('getAvgTimePerPlayer is hit yo!');
      const gameHalfTimeTemp = games[0].gameHalfTime
      const matchFormat = games[0].matchFormat

      const gameTimeFullRaw = gameHalfTimeTemp * 2
			console.log(gameTimeFullRaw + ' this is going to be large?');
			const gameTimeFull = formattedSeconds(gameTimeFullRaw)
			console.log(gameTimeFull + ' this is going to be large 2?');
      const matchFormatMinusGoalie = matchFormat - 1

      let playerAbsCount = 0
			let playerGoalieCount = 0
      games[0].teamPlayers.map(player => {
        if (player.currentPosition === 'abs') {
          playerAbsCount = playerAbsCount + 1
        }
				else if (player.currentPosition === 'gol') {
          playerGoalieCount = playerGoalieCount + 1
					checkAndStoreId(player.id);
        }
      })
			console.log(playerAbsCount + ' playerAbsCount');
			console.log(playerAbsCount + ' playerGoalieCount');

			if (hasDifferentId === true) {
				playerGoalieCount = 0
			}

      const teamPlayersLength = games[0].teamPlayers.length
      let teamPlayersLengthMinusGoalie = teamPlayersLength - playerGoalieCount
			teamPlayersLengthMinusGoalie = teamPlayersLengthMinusGoalie - playerAbsCount
			console.log(teamPlayersLengthMinusGoalie + ' teamPlayersLengthMinusGoalie');
      const playerMinutes = gameTimeFull * matchFormatMinusGoalie
      let avgTimePerPlayerRaw = playerMinutes / teamPlayersLengthMinusGoalie

			console.log(avgTimePerPlayerRaw + ' avgTimePerPlayerRaw here now');

			//avgTimePerPlayerRaw = Math.round(avgTimePerPlayerRaw * 100) / 100;

			//const avgTimePerPlayer = formattedSeconds(avgTimePerPlayerRaw)
			const avgTimePerPlayer = Math.round(avgTimePerPlayerRaw);

			console.log(avgTimePerPlayer + ' avgTimePerPlayer?? whats going on?');


      games[0].avgTimePerPlayer = avgTimePerPlayer

			eventsVersion = eventsVersion + 1
      dispatch(updateGames(games))
			dispatch(updateEventsVersion(eventsVersion))


      const teamIdCodeGames = games[0].teamIdCode
      const gameIdDb = games[0].gameIdDb

      firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
         game: games[0],
       })

      userRef.doc(gameIdDb).update({ game: games[0] });


  }
	*/

const positionBoxDisplays = (player) => {

	//let boxDisplay = ''
	//console.log(player.indexId + ' what is player.indexId')
	//console.log(JSON.stringify(knightPosArray) + ' what is knightPosArray')

	if (player.indexId >= 0) {
	//console.log(player.row + ' what is player.row?? over here')
	//console.log(player.column + ' what is player.column?? over here')
	let playerPos = ''
	if (player.row === 0) {
		playerPos = 'gol'
		dipatchPosChange(player, playerPos)
		return (
			<Box bg="fuchsia.200" minW="90%" minH="50%" shadow="9" rounded="md">
					<Text style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center', paddingTop: '4%', color: '#333'}}>{player.initials[0]}{player.initials[1]}</Text>
					<SelectPlayerTime gameData={getGameDataReverse[0]} playerData={player} golie={true} secondsElapsedProps={secondsElapsed} />
			</Box>
		)
	}
	if (player.row === 1) {
		playerPos = 'def'
		dipatchPosChange(player, playerPos)
		return (
			<Box bg="warning.200" minW="90%" minH="50%" shadow="9" rounded="md">
					<Text style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center', paddingTop: '4%', color: '#333'}}>{player.initials[0]}{player.initials[1]}</Text>
					<SelectPlayerTime gameData={getGameDataReverse[0]} playerData={player} golie={false} secondsElapsedProps={secondsElapsed} />
			</Box>
		)
	}
	if (player.row === 2) {
		playerPos = 'mid'
		dipatchPosChange(player, playerPos)
		return (
			<Box bg="yellow.100" minW="90%" minH="50%" shadow="9" rounded="md">
					<Text style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center', paddingTop: '4%', color: '#333'}}>{player.initials[0]}{player.initials[1]}</Text>
					<SelectPlayerTime gameData={getGameDataReverse[0]} playerData={player} golie={false} secondsElapsedProps={secondsElapsed} />
			</Box>
		)
	}
	if (player.row === 3) {
		playerPos = 'fwd'
		dipatchPosChange(player, playerPos)
		return (
			<Box bg="primary.100" minW="90%" minH="50%" shadow="9" rounded="md">
					<Text style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center', paddingTop: '4%', color: '#333'}}>{player.initials[0]}{player.initials[1]}</Text>
					<SelectPlayerTime gameData={getGameDataReverse[0]} playerData={player} golie={false} secondsElapsedProps={secondsElapsed} />
			</Box>
		)
	}
	if (player.row === 7) {
		playerPos = 'abs'
		dipatchPosChange(player, playerPos)
		return (
			<Box bg="#fb7185" minW="90%" minH="50%" shadow="9" rounded="md">
					<Text style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center', paddingTop: '4%', color: '#333'}}>{player.initials[0]}{player.initials[1]}</Text>
					<SelectPlayerTime gameData={getGameDataReverse[0]} playerData={player} golie={false} secondsElapsedProps={secondsElapsed} />
			</Box>
		)
	}
	else {
		playerPos = 'sub'
		dipatchPosChange(player, playerPos)
		return (
			<Box bg="emerald.200" minW="90%" minH="50%" shadow="9" rounded="md">
					<Text style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center', paddingTop: '4%', color: '#333'}}>{player.initials[0]}{player.initials[1]}</Text>
					<SelectPlayerTime gameData={getGameDataReverse[0]} playerData={player} golie={false} secondsElapsedProps={secondsElapsed} />
			</Box>
		)
	}
}

}

const dipatchPosChange = async (player, playerPos) => {

	try {
	const playerIndexRaw = games[0].teamPlayers.findIndex(x => x.id === player.indexId);
	const currentPlayerPosition = games[0].teamPlayers[playerIndexRaw].currentPosition
	//console.log(player.playerName);
	console.log(playerPos + ' playerPos')
	//console.log(currentPlayerPosition + ' currentPlayerPosition')
	//console.log(player.column + ' player.column')
	//console.log(player.row + ' player.row')

	if (currentPlayerPosition !== playerPos) {
		//console.log(player.indexId + ' player indexId. here to see how many times?')
		//console.log(playerPos + ' playerPos')


			games[0].teamPlayers[playerIndexRaw].currentPosition = playerPos
			games[0].teamPlayers[playerIndexRaw].positionDetails.row = player.row
			games[0].teamPlayers[playerIndexRaw].positionDetails.column = player.column

			//console.log(JSON.stringify(games[0].teamPlayers[playerIndexRaw]) + ' [0].teamPlayers[playerIndexRaw] checky herew.')

			let secondsElapsedTemp = secondsElapsed
			if (games[0].gameSetupProfile !== currentUser.uid) {
	      //console.log('hitting, ja. dragDrop');
	        secondsElapsedTemp = games[0].secondsElapsed
	    }
	    else {
	      secondsElapsedTemp = secondsElapsed
	    }

			let naCount = 0
			if (games[0].gameSetup === false) {
				const playerFromGame = games[0].teamPlayers[playerIndexRaw]
				console.log('checking savePositionTime ok 4');
				//Alert.alert("checking savePositionTime ok 4" )
				const positionTimesSave = PositionTimes.savePositionTime(playerFromGame, secondsElapsedTemp);
	      const positionTimesSaveFirst = positionTimesSave[0];
				//console.log(positionTimesSaveFirst + ' positionTimesSaveFirst what is?')
	      games[0].teamPlayers[playerIndexRaw] = positionTimesSaveFirst

				//console.log(playerPos + ' playerPos what is?')
				const positionTimesGet = PositionTimes.getPositionTime(playerFromGame, secondsElapsedTemp, games[0].gameHalfTime, games[0].halfTime);
	      const positionTimesGetSecond = positionTimesGet[0];
	      naCount = positionTimesGet[1];
				//console.log(positionTimesGetSecond + ' positionTimesGetSecond what is?')
	      games[0].teamPlayers[playerIndexRaw] = positionTimesGetSecond

				//console.log(JSON.stringify(player) + ' player after adding position times.')

			}
			else {
				//console.log(JSON.stringify(games[0].teamPlayers + ' check games[0].teamPlayers here for pos. dragDrop.'));
				games[0].teamPlayers[playerIndexRaw].positionDetails.indexId = player.indexId
				games[0].teamPlayers[playerIndexRaw].positionDetails.initials = player.initials
				games[0].teamPlayers[playerIndexRaw].positionDetails.playerName = player.playerName
				games[0].teamPlayers[playerIndexRaw].positionDetails.gameTimeStats = player.gameTimeStats
			}

			//update events
	    let subText = ''
	    if (playerPos === 'fwd') {
	        subText = player.playerName + " is now playing as a Forward"
	    }
	    else if (playerPos === 'mid') {
	      subText = player.playerName + " is now playing Midfeild"
	    }
	    else if (playerPos === 'def') {
	      subText = player.playerName + " is now playing as a Defender"
	    }
	    else if (playerPos === 'gol') {
	      subText = player.playerName + " is now playing as Golie"
	    }
	    else if (playerPos === 'sub') {
	      subText = player.playerName + " has been substituted off"
	    }

			/*
	    if (props.whereFrom === 1) {
	      //try {
	        if (playerPos === 'sub') {
	          games[0].gameEvents.push({eventType: 'sub', eventText: subText, eventTime: secondsElapsed})
	        }
	        else {
	          games[0].gameEvents.push({eventType: 'pos', eventText: subText, eventTime: secondsElapsed})
	        }
	    }
			*/

			let addDescEvent = []

			if (props.whereFrom === 1) {
				console.log('this is the key - why not hitting');


	      //try {
	        if (playerPos === 'sub' && positionEventFlag === true) {
						console.log(games[0].secondsElapsed + ' _games[0].secondsElapsed');
						console.log(secondsElapsed + ' secondsElapsed');
						console.log('this is the key - why not hitting 1.5');
						console.log(subText + ' what is subText');
						addDescEvent = [{eventType: 'sub', eventText: subText, eventTime: games[0].secondsElapsed}]
						//console.log(JSON.stringify(addDescEvent[0]) + ' above check addPoEvent[0]');

						try {
								games[0].gameEvents.push(addDescEvent[0])
						}
						catch {
							games[0].gameEvents = []
							games[0].gameEvents.push(addDescEvent[0])
						}

						console.log('this is the key - why not hitting 1.7');
	        }
	        else if (positionEventFlag === true) {
						console.log('this is the key - why not hitting 1.8');
						addDescEvent = [{eventType: 'pos', eventText: subText, eventTime: games[0].secondsElapsed}]
						//console.log(JSON.stringify(addDescEvent[0]) + ' above check addPoEvent[0] 2');
						try {
								games[0].gameEvents.push(addDescEvent[0])
						}
						catch {
							games[0].gameEvents = []
							games[0].gameEvents.push(addDescEvent[0])
						}
						console.log('this is the key - why not hitting 1.9');
	        }

					//games[0].latestUpdateUid = currentUser.uid

				}


			 //console.log(getLatestId + ' getLatestId is whaaa?');
 			console.log(currentUser.uid + ' currentUser.uid is whaaa?');
 			console.log(games[0].latestUpdateUid + ' games[0].latestUpdateUid is whaaa check?');

 			//if (games[0].latestUpdateUid === currentUser.uid) {
 				games[0].latestUpdateUid = currentUser.uid

 				dispatch(updateGames(games))

 				const teamIdCodeGames = games[0].teamIdCode
 		    const gameIdDb = games[0].gameIdDb
 				games[0].sixtySecondsMark = sixtySecondsMark


 				console.log(games[0].sixtySecondsMark + ' games[0].sixtySecondsMark is??');
 				console.log(JSON.stringify(games[0].teamPlayers) + ' games[0].teamPlayers again is??');


 				if (games[0].halfTime > 0) {
 					firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
 						 game: games[0],
 					 })
 			 	}


 				//userRef.doc(gameIdDb).update({ game: games[0] });
			/*}
			else {
				console.log('do we hit here sometimes? 1');
				//eventsVersion = eventsVersion + 1;
	      //dispatch(updateEventsVersion(eventsVersion));
			}*/

	}
	else {
		console.log('we now whit ya?');


		games[0].teamPlayers[playerIndexRaw].currentPosition = playerPos
		games[0].teamPlayers[playerIndexRaw].positionDetails.row = player.row
		games[0].teamPlayers[playerIndexRaw].positionDetails.column = player.column
		dispatch(updateGames(games))


	}
}
catch {
	// do nothing.
	//console.log('erro hit need ')
	//console.log(JSON.stringify(games[0].teamPlayers) + ' check games[0].teamPlayers here for pos. ERROR dragDrop.');
	//console.log(playerPos + ' playerPos')
	//console.log(player.column + ' player.column')
	//console.log(player.row + ' player.row')
	console.log('iisssue.');

}

	//dispatch(updateSubSuggestions([], []));

}

	const draxViewDisplay = () => {

		//let indexPlayer = 0


		const displayreturn = knightPosArray.map(player => {

			//console.log(player.row + ' what is player.row??')
			//console.log(player.column + ' what is player.column??')
			//console.log(JSON.stringify(player) + ' what is player alll???')
			return (
				<DraxView
					style={[
						styles.knight,
						{
							width: squareWidth,
							height: squareWidth,
							top: player.row * squareWidth,
							left: player.column * squareWidth,
						},
					]}
					draggingStyle={styles.dragging}
					dragPayload={() => {
						setKnightPosArray
					}}
					onDragStart={() => {
						console.log('onDragStart hit!')
						dispatch(updatePositionEventFlag(true))
						//console.log(';just checking in a guess player.')

						//const playerIndexRaw = games[0].teamPlayers.findIndex(x => x.id === player.indexId);
						////console.log(playerIndexRaw + ' playerIndexRaw')
						//setPlayerIndex(playerIndexRaw)

						//dispatch(updatePlayerIndex(player.indexId))
						//dispatch(updatePlayerIndex(false))

						//setTestLoading(0)
						setTimeout(function(){

							setTestLoading(7)


						}, 100);

						if (props.whereFrom === 1) {
							const playerIndexRawTwo = games[0].teamPlayers.findIndex(x => x.id === player.indexId);
							//console.log(playerIndexRawTwo + ' playerIndexRawTwo')
							setPlayerIndex(playerIndexRawTwo)
							setExitDrag(false)
							//dispatch(updatePlayerIndex(false))
							setPlayerIndexPos(player.indexId)
							setMoving(true);
						}
						else {
							const playerIndexRawTwo = games[0].teamPlayers.findIndex(x => x.id === player.indexId);
							setPlayerIndex(playerIndexRawTwo)
							setExitDrag(false)
							//dispatch(updatePlayerIndex(false))
							setPlayerIndexPos(player.indexId)
							setMoving(true);
						}
					}}
					onDragEnd={() => {
						//console.log('onDragEnd hit!')

						setTestLoading(6)
						//dispatch(updatePlayerIndex(player.indexId))
						setMoving(false);
						setTestLoading(3)


					}}
					onDragExit={() => {
						console.log('onDragExit hit!')
						dispatch(updateSubSuggestions([], []));

						setTestLoading(0)

						const playerIndexRawTwo = games[0].teamPlayers.findIndex(x => x.id === player.indexId);
						//console.log(playerIndexRawTwo + ' playerIndexRawTwo')
						setPlayerIndex(playerIndexRawTwo)

						console.log(player.row + ' player.row is? exit');
						console.log(player.column + ' player.column is? exit');


					}}
					onDragDrop={() => {

						/* set this if I want to load between dragdrops
						setTestLoading(1)
						*/

						console.log('onDragDrop hit!')
						setExitDrag(true)
						//dispatch(updatePlayerIndex(true))
						setMoving(false);
						setPlayerPositionDisplayBoardText("" + player.playerName + "'s position updated to")
						//console.log(playerPositionDisplayBoard + ' playerPositionDisplayBoard onDragDrop!')
						//console.log(playerPositionDisplayBoardLatest + ' playerPositionDisplayBoardLatest on show position text!')
						//console.log(playerIndexPos + ' playerIndexPos  on show position text')
						//console.log(playerIndex + ' playerIndexPos  on show position text')
						dispatch(updatePlayerIndex(player.indexId))


						const playerIndexRaw = games[0].teamPlayers.findIndex(x => x.id === playerIndexPos);
						let playerPosDisplay = ''
						try {
							playerPosDisplay = games[0].teamPlayers[playerIndexRaw].currentPosition
						}
						catch {
							//console.log('some reasom this is hit! mm kay');
							playerPosDisplay = 'sub'
						}
						setPlayerPositionOld(playerPosDisplay)

						setPlayerPositionDisplayBoard(true)

						//console.log(playerPositionDisplayBoard + ' playerPositionDisplayBoard onDragDrop 2!')

							/*
							const gameIdDbNew = games[0].gameIdDb

							userRef.doc(gameIdDbNew)
						  .update({
						    'game.latestUpdateUid': currentUser.uid
						  })
						  .then(() => {
						    console.log('game.latestUpdateUid successfully updated!');
						  })
						  .catch(error => {
						    console.error('Error updating game.latestUpdateUid: ', error);
						  });
							*/





							console.log(player.row + ' player.row is?');
							console.log(player.column + ' player.column is?');

							//dispatch(updateSubSuggestions([], []));


							setTimeout(function(){

								addRowUpdateToDb(playerIndexRaw, player)
								//getAvgTimePerPlayer()


							}, 200);

							/*
							setTimeout(function(){

								try {
									setTestLoading(0)
								}
								catch {
									//do nothing.
								}


							}, 1500);
							*/

						setTimeout(function(){

							try {
								setPlayerPositionDisplayBoard(false)
							}
							catch {
								//do nothing.
							}


						}, 3000);


					}}
				>
					{positionBoxDisplays(player)}

			</DraxView>
			)

			//indexPlayer++

	})

	return displayreturn


	}

	const addRowUpdateToDb = async (playerIndexRaw, player) => {


		console.log(' first thing first, dow e get here? again!');
		console.log('checkking game here - doe sit have updates? ' + JSON.stringify(games[0]));
		const gameIdDb = games[0].gameIdDb
		userRef.doc(gameIdDb).update({ game: games[0] });

		/*
		console.log(' first thing first, dow e get here? again!');


		let gameData = []
		let gameDataReverse = []
		//try {

		console.log(' first thing first, dow e get here? again! 2');
			let userRefId = null
			try {
				if (userProfile === 4) {
					//console.log('profile 4 is hit!');
					//console.log(parentCoachView + ' parentCoachView ID is?');
					userRefId = parentCoachView
				}
				else {
					userRefId = currentUser.uid
				}
			}
			catch {
				//do nothing.
			}

			console.log(' first thing first, dow e get here? again! 3');

		const data = await getGamesDataOnce(userRefId); // <-- replace collection name
		console.log(' doe s this show 3');

		//setPosts(data);
 //console.log('getting here aye?');
 console.log(' doe s this show 4');

		data.map(game => {
			console.log(' doe s this show 5');
	 //console.log(JSON.stringify(game) + ' what do we have in here?');

			try {
				console.log(' doe s this show 5.5');
				if (game.game.isGame === true) {
					//console.log(game.game.id + ' game id t4esting only');
					console.log(' doe s this show 6');
					gameData.push(game.game)
				 }
			 }
			 catch {
				 console.log(' doe s this show 7');
			 }


		 })
		 console.log(' doe s this show 8');

	 const gameDataIdOrder = gameData.sort((a, b) => a.id - b.id);
	 gameDataReverse = gameDataIdOrder.reverse();

	 console.log('gameDataReverse needs look at ' + JSON.stringify(gameDataReverse));

	 const teamPlayersTemp = gameDataReverse[0].teamPlayers

	 console.log(JSON.stringify(teamPlayersTemp[0]) + ' teamPlayersTemp[0] check here now.');
	 console.log(JSON.stringify(player) + ' player check here now.');
	 console.log(JSON.stringify(teamPlayersTemp[0].positionDetails.row) + ' teamPlayersTemp[0].positionDetails.row check here now.');

	 console.log(player.row + ' player.row is? delay new');
	 console.log(player.column + ' player.column is? delay new')

	 console.log(playerIndexRaw + ' is playerIndexRaw??');





		teamPlayersTemp[playerIndexRaw].positionDetails.row = player.row;
		teamPlayersTemp[playerIndexRaw].positionDetails.column = player.column;


		console.log(JSON.stringify(teamPlayersTemp[0].positionDetails.row) + ' teamPlayersTemp[0].positionDetails.row check here after 1. ');


		console.log(JSON.stringify(teamPlayersTemp[0]) + ' teamPlayersTemp[0] check here after.');
		console.log(JSON.stringify(teamPlayersTemp[0].positionDetails.row) + ' teamPlayersTemp[0].positionDetails.row check here after.');

		console.log('checkking game here - doe sit have updates? ' + JSON.stringify(games[0]));


		//userRef.doc(gameIdDb).update({ game: games[0] });
		const gameIdDb = games[0].gameIdDb
		await userRef.doc(gameIdDb).update({
			'game.teamPlayers': teamPlayersTemp
		});

		*/


	}

	const positionDisplayPos = () => {

		let _games = []
		try {
			_games = [...games]
		}
		catch {
			_games = [{...games}]
		}

		const currentPosition = _games[0].teamPlayers[playerIndex].currentPosition

		return (
			<Text>{currentPosition} Hi!</Text>
		)


	}

	const checkPlayerCountNew = () => {
		//console.log('is hit one huh');
		//console.log('is hit one huh')

		try {
			if (games[0].teamPlayers.length > 1 && whereFrom === 1) {
				console.log('is hit two huh new new')
				return (
					<SelectPlayerStats navigation={props.navigation} whereFrom={props.whereFrom} playerIndex={playerIndex} teamId={props.teamId} newDisplay={true} gamePlayerData={games[0].teamPlayers} gameSecondsElapsed={games[0].secondsElapsed} playerIndexPos={playerIndexPos} fromLiveGame={true} />
				)
			}
		}
		catch {
			//do nothing.
			console.log(' so were hitting her hub.');

		}
	}

	const checkPlayerCount = () => {

		try {
			//console.log(games[0].teamPlayers.length + ' whats the numner?')

			if ((games[0].teamPlayers.length > 1 && exitDrag === true) && (whereFrom === 7)) {
				return (

					<SelectPlayerStats navigation={props.navigation} whereFrom={props.whereFrom} playerIndex={playerIndex} teamId={props.teamId} selectPlayer={true}/>

				)
			}
			else if ((games[0].teamPlayers.length > 1 && exitDrag === true) && whereFrom === 1) {
				return (

					<SelectPlayerStats navigation={props.navigation} whereFrom={props.whereFrom} playerIndex={playerIndex} teamId={props.teamId} />

				)
			}
		}
		catch {
			//do nothing.
		}

	}

	const displaySelectSeason = () => {

		//console.log(whereFrom + ' whats whereFrom numner?')

		if (whereFrom === 7) {
			return (

				<View style={{minWidth: '100%'}}>
				{props.isOpen === 1 &&
					<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,1)', 'rgba(0,0,0,1)']} style={styles.linearGradientSeason}>
				<View style={{paddingLeft: '5%', paddingRight: '5%'}}>
					<SelectSeason navigation={props.navigation} whereFrom={props.whereFrom} isOpen={props.isOpen} teamIdCode={games[0].teamIdCode} />
				</View>
				</LinearGradient>
			}
			{props.isOpen === 0 &&
				<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,1)', 'rgba(0,0,0,1)']} style={styles.linearGradientSeason}>
			<View style={{paddingLeft: '5%', paddingRight: '5%'}}>
				<SelectSeason navigation={props.navigation} whereFrom={props.whereFrom} isOpen={props.isOpen} teamIdCode={games[0].teamIdCode}/>
			</View>
			</LinearGradient>
		}
			</View>
			)
		}

	}

	const displayPlayerSort = () => {

		//console.log(whereFrom + ' whats whereFrom numner?')

		//console.log(props.teamId + ' props.teamId owkring?')

		//console.log(playerIndex + ' playerIndex owkring?')
		//console.log(playerIndexPos + ' playerIndex owkring?')
		//let playerIndexPosTemp = playerIndexPos
		//playerIndexPosTemp++
		//console.log(JSON.stringify(games[0].teamPlayers[playerIndex]) + ' games[0].teamPlayers[playerIndex] owkring?')

		//console.log(props.whereFrom + ' props.whereFrom owkring?')
		//console.log(props.isOpen + ' props.isOpen owkring?')


		try {

			//console.log(' how often hitting?')

		if (props.whereFrom === 7 && exitDrag === true) {
			return (
				<View style={{width: '100%'}}>
			{props.isOpen === 0 &&
			<View>

					<SeasonPositionSortAll playerData={undefined} teamId={props.teamId} seasonId={seasonsDisplayId} whereFrom={79} navigation={props.navigation} displayTypeSort={false} exitDrag={exitDrag} />

			</View>
		}
			</View>
			)
		}
		else if (props.whereFrom === 1 && exitDrag === true)
		return (
		<View style={{paddingLeft: 15, paddingRight: 15}}>

				<SeasonPositionSortAll playerData={undefined} teamId={games[0].teamId} seasonId={seasonsDisplayId} whereFrom={79} navigation={props.navigation} displayTypeSort={true} liveGame={true} exitDrag={exitDrag} />



		</View>
		)
	}
	catch {
		//do nothing.
	}
	}


	const exitToHome = () => {

    const gameId = games[0].gameId
    dispatch(updateExitGameFlag(false))
    dispatch(updateGameBoardHideBtn(0))

    navigate('Home',{
      updateHome: gameId
    });

  }

	const instructionsTextDragDropNew = () => {

		if (whereFrom === 7) {
			return (

					<Box style={{textAlign: 'flex-start', backgroundColor: '#000'}} pb="1">
							<Text style={{fontSize: 18, color: '#fff', marginLeft: 15}}>{handPointer} Drag Players Into Position:</Text>
					</Box>
			)
		}
		else {
			return (

					<Box style={{textAlign: 'flex-start'}}>
							<Text style={{color: '#fff', paddingBottom: 1, fontSize: 12}}>Drag & drop players to swap positions or substatute a player.</Text>
							<Text style={{color: '#fff', paddingBottom: 3, fontSize: 12}}>Tap a player to see stats or to add a goal, save/tackle, assist.</Text>
					</Box>

				)
		}
	}

	const instructionsTextDragDrop = () => {


		if (whereFrom === 7) {
			return (
					<Box style={{textAlign: 'flex-start'}} pb="3">
						{isFirstGame === true &&
							<View>
							<Text style={{color: '#fff', paddingBottom: 1}}>Please drag & drop players into position.</Text>
							<Text style={{color: '#fff', paddingBottom: 3}}>Tap on a player to see their season stats below.</Text>
							</View>
						}
							<Text style={{fontSize: 11, color: '#fff', fontWeight: '700', marginLeft: 15}}>IMPORTANT! Drag players into position. Also, drag any players who are absent or not playing into the <Text style={{color: '#fb7185'}}>RED</Text> area at the bottom of the feild.</Text>
					</Box>
			)
		}
		else {
			return (

					<Box style={{textAlign: 'flex-start'}}>
							<Text style={{color: '#fff', paddingBottom: 1, fontSize: 12}}>Drag & drop players to swap positions or substatute a player.</Text>
							<Text style={{color: '#fff', paddingBottom: 3, fontSize: 12}}>Tap a player to see stats or to add a goal, save/tackle, assist.</Text>
					</Box>

				)
		}

	}

	const checkPositionChangeDisplay = () => {

		//console.log(playerPositionDisplayBoardLatest + ' playerPositionDisplayBoardLatest on show position text!')
		//console.log(playerPositionOld + ' playerPositionOld  on show position text')
		//console.log(playerIndex + ' playerIndexPos  on show position text')

		/*
		const playerIndexRaw = games[0].teamPlayers.findIndex(x => x.id === playerIndexPos);
		let playerPosDisplay = ''
		try {
			playerPosDisplay = games[0].teamPlayers[playerIndexRaw].currentPosition
		}
		catch {
			playerPosDisplay = 'sub'
		}
		*/


		let currentPosText = ''

		if (playerPositionDisplayBoardLatest === 'goalie') {
			currentPosText = 'gol'
		}
		else if (playerPositionDisplayBoardLatest === 'defender') {
			currentPosText = 'def'
		}
		else if (playerPositionDisplayBoardLatest === 'midfield') {
			currentPosText = 'mid'
		}
		else if (playerPositionDisplayBoardLatest === 'forward') {
			currentPosText = 'fwd'
		}
		else if (playerPositionDisplayBoardLatest === 'absent/not playing') {
			currentPosText = 'abs'
		}
		else {
			currentPosText = 'sub'
		}

		//console.log(currentPosText + ' currentPosText herey checky')
		//console.log(playerPositionOld + ' playerPositionOld herey checky..')

		if (currentPosText !== playerPositionOld) {

			return (
				<Box style={{zIndex: 300, elevation: 300}}>
				{playerPositionDisplayBoard === true &&
					<PresenceTransition visible={playerPositionDisplayBoard} initial={{
					opacity: 0
					}} animate={{
					opacity: 1,
					transition: {
						duration: 250
					}
					}}
					>
					<Box>
						<Center style={{position:'absolute', left: 0, top: 400, height: 'auto'}} mt="2" pl="0" rounded="lg" minW="100%" _text={{
						color: "white"
						}} shadow="9" shadowOffset="-20">
							<Center>
								<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#d1fae5', '#34d399']} style={styles.linearGradientEventBoard}>
									<Text style={{color: '#333'}}>{playerPositionDisplayBoardText} {playerPositionDisplayBoardLatest}</Text>
								</LinearGradient>
							</Center>
						</Center>
						</Box>
					</PresenceTransition>
					}
					</Box>
			)
		}

	}

	const compareButton = () => {

		//console.log(seasonsDisplayId + ' what did it say about iut');

		if (seasonsDisplayId === 99999998) {
      Alert.alert("Please select a Current Season before you continue." )
    }
		else {

			//console.log(JSON.stringify(knightPosArray) + ' check posArray before going to Sortpage.');

			dispatch(updatePosArray(knightPosArray, knightPosArray))

			const checkSortLiveNew = checkSortLive + 1
			setCheckSort(checkSortLiveNew)

			/*
			if (knightPosArray === undefined) {
				//console.log('knightPosArray === undefinded!');

				getPosArrayStats()
			}
			*/

			//getPosArrayStats()

	    navigate('SeasonPositionSortAllHome',{
				whereFrom: whereFrom,
				posArray: knightPosArray,
				showNewScreen: false,
				checkSortLive: checkSortLiveNew
			});
		}

  }

	const dragAbsent = () => {

		//console.log(JSON.stringify(knightPosArray) + ' checking knightPosArray');

		//knightPosArray[positionIndex].row

		let hasAbsentPlayer = false
		knightPosArray.map(player => {
			//console.log(player.row + ' player.row');

			if (player.row === 7) {
				hasAbsentPlayer = true
			}

		})

		//console.log(whereFrom + ' another whereFrom check. ha');


		if (exitDrag !== false && whereFrom === 7 && hasAbsentPlayer === false && props.sortPage !== true) {
		return (
			<Text style={{position: 'absolute', top: '35%', color: '#fff', paddingLeft: 20, fontSize: 20}}>Drag Absent Players Here.</Text>
			)
		}
		else if (exitDrag !== false && whereFrom === 7 && hasAbsentPlayer === false && props.sortPage === true) {
			return (
				<Text style={{position: 'absolute', bottom: '2.5%', color: '#fff', paddingLeft: 20, fontSize: 20}}>Drag Absent Players Here.</Text>
			)
		}
		else if (exitDrag !== false && whereFrom === 1 && hasAbsentPlayer === false) {
			return (
				<Text style={{position: 'absolute', bottom: '2.5%', color: '#fff', paddingLeft: 20, fontSize: 20}}>Drag Absent Players Here.</Text>
			)
		}


	}

	const backButton = () => {
		//console.log(JSON.stringify(knightPosArray) + ' check posArray before going to Sortpage.');

		dispatch(updatePosArray(knightPosArray, knightPosArray))

		const checkSortLiveNew = checkSortLive + 1
		setCheckSort(checkSortLiveNew)

		/*
		if (knightPosArray === undefined) {
			//console.log('knightPosArray === undefinded!');

			getPosArrayStats()
		}
		*/

		//getPosArrayStats()

		if (props.whereFrom === 7) {
      navigate('AddPlayersHome', {
        teamId: games[0].teamId,
        teamIdCode: games[0].teamIdCode,
        whereFrom: 7,
				showNewScreen: false
      });
    }
    else {

      navigate('GameHome', {
        fromContinue: 0,
      });
    }
	}

	const testData = () => {
		try {
			return (
				<Box>
					<Text style={{color: '#fff'}}>games[0].teamPlayers[0].positionDetails.row: {games[0].teamPlayers[0].positionDetails.row}</Text>
					<Text style={{color: '#fff'}}>games[0].teamPlayers: {JSON.stringify(games[0].teamPlayers[0])}</Text>
					<Text style={{color: '#fff'}}>games[0].gameIdDb: {games[0].gameIdDb}</Text>
					<Text style={{color: '#fff'}}>games[0].latestUpdateUid: {games[0].latestUpdateUid}</Text>
					<Text style={{color: '#fff'}}>getLatestId: {getLatestId}</Text>
					<Text style={{color: '#fff'}}>currentUser.uid: {currentUser.uid}</Text>
					<Text style={{color: '#fff'}}>eventsVersion: {eventsVersion}</Text>
					<Text style={{color: '#fff'}}>getTestLoading: {getTestLoading}</Text>
				</Box>
			)
		}
		catch {
			//nothing.
		}
	}

	const loadingSymbol = () => {

		//setTimeout(function(){
			if (getTestLoading === 1 && fromContinueGame === 0) {
				return (
					<Box style={{position: 'absolute', backgroundColor: 'rgba(0,0,0,0.5)', padding: 15, width: '100%', height: '105%', left: 7.5, bottom: 1}}>
						<Center style={{height: '100%'}}>
							<ActivityIndicator size="large" color="#fff" animating={true} />

							<Text style={{color: '#fff', fontSize: 20, fontWeight: '600', textAlign: 'center'}}>Updating...</Text>

						</Center>
					</Box>
				)
			}
			else if (getTestLoading === 1) {
				return (
					<Box style={{position: 'absolute', backgroundColor: 'rgba(0,0,0,0.5)', padding: 15, width: '100%', height: '105%', left: 7.5, bottom: 1}}>
						<Center style={{height: '100%'}}>
							<ActivityIndicator size="large" color="#fff" animating={true} />

							<Text style={{color: '#fff', fontSize: 20, fontWeight: '600', textAlign: 'center'}}>Updating live events & scores for supporters...</Text>

						</Center>
					</Box>
				)
			}
		//}, 300);

	}

	const displayPositionSort = (fromLiveGame) => {

		console.log('need this data teamPlayers ' + JSON.stringify(teamPlayers));
		console.log(playerIndexPos + ' playerIndexPos atatas')
		console.log(getLatestId + ' getLatestId')
		console.log(playerIndex + ' playerIndex')

		const showAssignPlayerPositions = games?.[0]?.teamPlayers?.every(
		  player => !!player.playerPositions
		) ?? false;



		return (
			<Box style={{maxWidth: '100%', minWidth: '100%'}}>
			{showAssignPlayerPositions && (
				<AssignPlayerPositions playerData={undefined} navigation={props.navigation} playerIndex={playerIndexPos} fromLiveGame={fromLiveGame} />
			)}
			<PositionSortNew playerData={undefined} navigation={props.navigation} playerIndex={playerIndexPos} fromLiveGame={fromLiveGame} />
			</Box>
		)

	}

	const displayAiSubPositions = (fromLiveGame) => {

		/*
		console.log('need this data teamPlayers ' + JSON.stringify(teamPlayers));
		console.log(playerIndexPos + ' playerIndexPos atatas')
		console.log(getLatestId + ' getLatestId')
		console.log(playerIndex + ' playerIndex')
		*/

		const showAssignPlayerPositions = games?.[0]?.teamPlayers?.every(
		  player => !!player.playerPositions
		) ?? false;


		return (
			<Box style={{maxWidth: '100%', minWidth: '100%'}}>
				{showAssignPlayerPositions && (
					<AssignPlayerPositions playerData={undefined} navigation={props.navigation} playerIndex={playerIndexPos} fromLiveGame={fromLiveGame} />
				)}
			</Box>
		)

	}

	const displaySeasonPositionSortAll = () => {

		console.log(' just chec game her eok ' + JSON.stringify(games[0].teamPlayers));


			try {
				const playerDisplay = games[0].teamPlayers.map(player => {
					console.log('asssume im hittting here 2.');
					console.log(player.playerName + ' just aqucky playerName');

					console.log(player.positionDetails.indexId + ' player.positionDetails.indexId as');
					try {
			return (
				<Box ml="5" mr="5" maxW="100%">
					<SelectPlayerStats navigation={props.navigation} whereFrom={props.whereFrom} playerIndex={player.positionDetails.indexId} teamId={props.teamId} newDisplay={true} gamePlayerData={games[0].teamPlayers} gameSecondsElapsed={games[0].secondsElapsed} setupSubs={true} />
				</Box>
			)
			}
			catch {
				//return nothing.
			}

			return playerDisplay

		})
	}
	catch {
		//return nothing.
	}



	}


	return (
		<Box>
		{Platform.OS !== 'ios' &&
		<Box style={{maxWidth: '100%', minWidth: '100%'}}>
			{checkPositionChangeDisplay()}

		<DraxProvider>
			<View style={styles.container}>
				<View style={styles.containerRow}>
				{props.sortPage !== true && gameBoardHideBtn !== 1 &&
					<View>
						{displaySelectSeason()}
						{instructionsTextDragDropNew()}
					</View>
				}



				{gameBoardHideBtn !== 1 &&
					<Box style={styles.pushBoard}>

				<ImageBackground source={require(`../../assets/soccer-half-field-final.png`)} resizeMode="stretch" imageStyle={{ }} style={styles.backgroundImage}>
					<View style={styles.board}>
						{rowViews}
						{draxViewDisplay()}
						{loadingSymbol()}
						{dragAbsent()}
					</View>
					</ImageBackground>

					{fromContinueGame === 0 &&
						<View>
						{checkPlayerCountNew()}
						{displayPositionSort(false)}
						</View>
					}

					{fromContinueGame === 1 &&
						<View>
							{displayAiSubPositions(true)}
						</View>
					}



					{fromContinueGame === 1 &&
						<View>
					{checkPlayerCountNew()}


					{props.sortPage !== true && props.newDisplayDrag !== true &&
						<View>
						<ImageBackground source={require(`../../assets/soccerballpattern-leftcrop-trans.png`)} style={styles.backgroundImageBtn}>
							<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.8)', 'rgba(200,200,200,0.3)']} style={styles.linearGradientBtn}>
							<Button minW="100%" variant="unstyled" size="md" mt="3" mb="3" _text={{fontSize: 26, color: '#fff'}} onPress={() => compareButton()}>
								<HStack>
									<Center>
										{people}
										<Text style={styles.compareText}>Compare Substitute Times {doubleright}</Text>
									</Center>
								</HStack>
							</Button>
							</LinearGradient>
							</ImageBackground>

							{exitDrag === false &&
							<Text style={{color: '#fff'}}><ActivityIndicator size="small" color="#fff" animating={true} /> Updating...</Text>
							}

							{checkPlayerCount()}

						</View>
					}
					</View>
				}
					</Box>
				}



				</View>
			</View>
		</DraxProvider>
		</Box>
	}



	{Platform.OS === 'ios' &&
	<Box>
		{checkPositionChangeDisplay()}

	<DraxProvider>
		<View style={styles.container}>
			<View style={styles.containerRow}>
			{props.sortPage !== true && gameBoardHideBtn !== 1 &&
				<View>
					{displaySelectSeason()}
					{instructionsTextDragDropNew()}
				</View>
			}



			{gameBoardHideBtn !== 1 &&
				<Box style={styles.pushBoard}>

			<ImageBackground source={require(`../../assets/soccer-half-field-final.png`)} resizeMode="stretch" imageStyle={{ }} style={styles.backgroundImage}>
				<View style={styles.board}>
					{rowViews}
					{draxViewDisplay()}
					{loadingSymbol()}
					{dragAbsent()}
				</View>
				</ImageBackground>

				{fromContinueGame === 0 &&
					<View>
					{checkPlayerCountNew()}
					{displayPositionSort(false)}
					</View>
				}

				{fromContinueGame === 1 &&
					<View>
						{displayAiSubPositions(true)}
					</View>
				}


				{fromContinueGame === 1 &&
					<View>
				{checkPlayerCountNew()}


				{props.sortPage !== true && props.newDisplayDrag !== true &&
					<View>
					<ImageBackground source={require(`../../assets/soccerballpattern-leftcrop-trans.png`)} style={styles.backgroundImageBtn}>
						<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(0,0,0,0.8)', 'rgba(200,200,200,0.3)']} style={styles.linearGradientBtn}>
						<Button minW="100%" variant="unstyled" size="md" mt="3" mb="3" _text={{fontSize: 26, color: '#fff'}} onPress={() => compareButton()}>
							<HStack>
								<Center>
									{people}
									<Text style={styles.compareText}>Compare Substitute Times {doubleright}</Text>
								</Center>
							</HStack>
						</Button>
						</LinearGradient>
						</ImageBackground>

						{exitDrag === false &&
						<Text style={{color: '#fff'}}><ActivityIndicator size="small" color="#fff" animating={true} /> Updating...</Text>
						}

						{checkPlayerCount()}

					</View>
				}
				</View>
			}
				</Box>
			}
			</View>
		</View>
	</DraxProvider>
	</Box>
}
	</Box>
	);
};

const styles = StyleSheet.create({
	container: {
		//flex: 1,
		//paddingTop: 10,
		justifyContent: 'center',
		alignItems: 'center',
		//backgroundColor: '#059669'
	},
	containerRow: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1,
		elevation: 1
	},
	board: {
		//borderColor: 'black',
		//borderWidth: 3,
		marginTop: '5%',
		paddingRight: '3%',
		//paddingight: 15
	},
	row: {
		flexDirection: 'row',
	},
	dark: {
		backgroundColor: 'transparent',
	},
	light: {
		backgroundColor: 'transparent',
	},
	goalie: {
		backgroundColor: '#f5d0fe',
		opacity: 0.5,
	},
	defender: {
		backgroundColor: '#fed7aa',
		opacity: 0.5,
	},
	midfeild: {
		backgroundColor: '#fef9c3',
		opacity: 0.5,
	},
	forward: {
		backgroundColor: '#cffafe',
		opacity: 0.5,
	},
	sub: {
		backgroundColor: '#a7f3d0',
		opacity: 0.5,
	},
	absent: {
		backgroundColor: '#fb7185',
		opacity: 0.2,
	},
	square: {
		aspectRatio: 1,
	},
	receptive: {
		borderColor: '#0000ff',
		borderWidth: 2,
	},
	receiving: {
		borderColor: '#ff00ff',
		borderWidth: 2,
	},
	knight: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 1,
		paddingRight: 1,
	},
	dragging: {
		opacity: 0.2,
	},
	instructionText: {
		margin: 12,
		fontSize: 16,
		fontStyle: 'italic',
	},
	linearGradientEventBoard: {
    flex: 1,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    //marginLeft: 25,
    //marginRight: 25',
    width: '100%',
  },
	linearGradientInstructionsLive: {
    //flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },
	linearGradientInstructions: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    //marginLeft: 25,
    //marginRight: 25',
    width: '100%',
  },
	activityIndicatorTest: {
    flex: 1,
    //alignItems: 'top',
    //justifyContent: 'center',
    backgroundColor: '#e879f9',
    height: 500,
    width: 500,
  },
  activityIndicator: {

  },
  activityIndicatorLarge: {
    height: '100%',
    width: '100%',
    position: 'absolute'
  },
  activityIndicatorNone: {
    height: '0%',
  },
	linearGradientLoading: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
	compareText: {
		color: '#fff',
		fontSize: 18,
		textAlign: 'center',
		...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 18,
      },
      default: {
        lineHeight: 0,
      }
      })
	},
	compareBackText: {
		color: '#333',
		fontSize: 28,
		textAlign: 'center',
		...Platform.select({
      ios: {
        lineHeight: 0,
      },
      android: {
        lineHeight: 28,
      },
      default: {
        lineHeight: 0,
      }
      })
	},
	backgroundImageBtn: {
      //flex: 1,
      resizeMode: 'cover', // or 'stretch'
      overflow: 'hidden',
			marginTop: 15,
			marginBottom: 15,
  },
	backgroundImage: {
		...Platform.select({
      ios: {
        width: '100%',
      },
      android: {
        width: '100%',
				maxWidth: '100%',
      },
      default: {
        width: '100%',
      }
      })
  },
	linearGradientBtn: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
	pushBoard: {
		...Platform.select({
      ios: {
        paddingLeft: 0,
      },
      android: {
        paddingRight: 0,
      },
      default: {
        paddingLeft: 0,
      }
      })
	}
});

export default SelectPlayersDragDrop;


/*
{props.sortPage === true &&
	<View>
		<Button minW="100%" variant="unstyled" size="md" pt="4" pb="6" _text={{fontSize: 36, color: '#fff'}} variant="subtle" onPress={() => backButton()}>
			<HStack>
				<Center>
					<Text style={styles.compareBackText}>Back</Text>
				</Center>
			</HStack>
		</Button>
	</View>
}
*/
