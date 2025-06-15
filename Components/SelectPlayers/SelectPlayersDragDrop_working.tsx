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



import SelectPlayerStats from './SelectPlayerStats.js'
import SelectSeason from '../Setup/SelectSeason.js'
import SeasonPositionSortAll from '../PlayerStats/SeasonPositionSortAll.js'

import { updateGames } from '../../Reducers/games';
import { updateTeamPlayers } from '../../Reducers/teamPlayers';
import { updatePlayerIndex } from '../../Reducers/playerIndex';
import { updateCheckSort } from '../../Reducers/checkSort';
import { updatePosArray } from '../../Reducers/posArray';


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


	if (position.row === 6) {
			console.log(position.row + ' position.row')
			console.log(position.column + ' position.column')
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
				console.log(JSON.stringify(payload) + ' what do i get with payload?')
				console.log(JSON.stringify(position) + ' not sure what this deos?? 2')
				console.log(playerIndexPos + ' playerIndexPos checking here.')
				const positionRow = position.row
				const positionColumn = position.column
				const positionIndex = knightPosArray.findIndex(x => x.indexId === playerIndexPos);
				console.log(playerIndexPos)
				console.log(positionIndex)
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


	let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let games = useSelector(state => state.games.games);
	let sixtySecondsMark = useSelector(state => state.stopwatch.sixtySecondsMark)
	let secondsElapsed = useSelector(state => state.stopwatch.secondsElapsed)
	let playerIndexReducer = useSelector(state => state.playerIndex.playerIndex)
	let seasonsDisplayId = useSelector(state => state.seasons.seasonsDisplayId);
	let checkSort = useSelector(state => state.checkSort.checkSort);
	let posArrayAll = useSelector(state => state.posArray.posArray);
	let posArrayReset = useSelector(state => state.posArray.posArrayReset);


	const whereFrom = props.whereFrom

  const dispatch = useDispatch()



	/*
	useEffect(() => {

		console.log('hit here into this 1');

		console.log(props.whereFrom  + ' props.whereFrom hit here into this ');

		console.log(props.sortPage  + ' props.sortPage hit here into this ');

		console.log(props.checkSortLive  + ' checkSortLive hit here into this ');

		console.log(checkSort  + ' checkSort hit here into this ');

		console.log(JSON.stringify(props.posArray) + ' props.posArray checking again here.');
		console.log(JSON.stringify(knightPosArray) + ' knightPosArray checking again here.');


		if (props.sortPage === true) {
			console.log('hit here into this 2');
			setKnightPosArray(props.posArray)
		}


	},[checkSortLive])
	*/


	useEffect(() => {

			const checkSortLiveNew = checkSortLive + 1
			setCheckSort(checkSortLiveNew)
			const checkSortNew = checkSort + 1
			dispatch(updateCheckSort(checkSortNew))

	},[])


	/*
	useEffect(() => {


			if (checkSort === 1 && checkSortCount === 0) {
				setCheckSortCount(1)
				getPosArrayStats()
			}


	},[checkSort])
	*/

	useEffect(() => {

		getPosArrayStats()

		if (props.whereFrom === 1) {
			setIsFirstGame(false)
		}
		else {
			try {
				console.log(games.length + ' what is games.length? 2');
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

try {
	useEffect(() => {

		getPosArrayStats()

	},[games[0].teamPlayers.length])
}
catch {
	//do nothing.
}

	useEffect(() => {

		getPosArrayStats()

	},[sixtySecondsMark])


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


useEffect(() => {


	try {
	var result = games[0].teamPlayers.reduce((retArr, item) => {
	  // condition to avoid duplication
	  if (!retArr.includes(item)) {
	    var filteredArr = games[0].teamPlayers.filter((i) => {
	      return i.positionDetails.row === item.positionDetails.row && i.positionDetails.column === item.positionDetails.column;
	    });
	    if (filteredArr.length > 1) retArr = [...retArr, ...filteredArr];
	  }
	  return retArr;
	}, []);
	console.log(JSON.stringify(result) + ' result test')

	let playerTemp = []

	if (result.length > 0) {
		console.log(JSON.stringify(result) + ' hit, do something!')
		const playerIndexRaw = games[0].teamPlayers.findIndex(x => x.id === result[1].id);
		let playerRowTemp = result[0].positionDetails.row
		let playerIndexIdTemp = result[0].positionDetails.indexId
		playerRowTemp++
		playerIndexIdTemp++
		console.log(JSON.stringify(games[0].teamPlayers[playerIndexRaw].positionDetails.row) + ' test to see if change.? 1')
		games[0].teamPlayers[playerIndexRaw].positionDetails.row = 5
		games[0].teamPlayers[playerIndexRaw].positionDetails.column = 8
		//games[0].teamPlayers[playerIndexRaw].positionDetails.indexId = playerIndexIdTemp
		console.log(JSON.stringify(games[0].teamPlayers[playerIndexRaw].positionDetails.row) + ' test to see if change.? 2')


		const knightPosArrayIndexRaw = knightPosArray.findIndex(x => x.playerName === result[0].playerName);

		knightPosArray[playerIndexRaw].row = 5
		knightPosArray[playerIndexRaw].column = 8

		dispatch(updateGames(games))
		setKnightPosArray(knightPosArray)
		//dispatch(updatePosArray(knightPosArray, knightPosArray))
	}
}
catch {
	//do nothing.
}

})


	const getPosArrayStats = () => {

		//to do.
		let _games = []
		try {
			_games = [...games]
		}
		catch {
			_games = [{...games}]
		}

		const teamplayersGame = _games[0].teamPlayers
		console.log(JSON.stringify(_games) + ' _games what is?')
		console.log(_games[0].teamPlayers + ' _games.teamPlayers')

		//positionDetails: { row: 0, column: 0, indexId: 0, initials: '', gameTimeStats: '' }
		let posArray = []
		let countSubCheck = 0
		teamplayersGame.map(player => {
			let playerPosDetailsArray = []
			playerPosDetailsArray.push({ row: 0, column: 0, indexId: 0, initials: '', gameTimeStats: '' })
			console.log(JSON.stringify(posArray) + 'posarray hit in here 0.')
			const posArrayLength = posArray.length
			console.log(posArrayLength + ' posArrayLength hit in here 0.')
			let positionDetailsRow = 0
			let positionDetailsColumn = 0
			let indexId = 0
			let initials = ''
			let gameTimeStats = ''
			console.log(_games.gameSetup + ' _games[0].gameSetup hit in here 0')
			if (posArrayLength > 0 && _games[0].gameSetup === true) {
				console.log('hit in here 1')
				const prevPlayerIndex = posArrayLength - 1
				console.log(JSON.stringify(prevPlayerIndex) + ' prevPlayerIndex hit in here 1')
				console.log(JSON.stringify(posArray) + ' posArray hit in here 1')
				console.log(posArray[prevPlayerIndex].row + ' posArray[prevPlayerIndex].row hit in here 1')
				let prevPlayerRow = 0
				let prevPlayerColumn = 0
				prevPlayerRow = posArray[prevPlayerIndex].row
				prevPlayerColumn = posArray[prevPlayerIndex].column
				console.log(JSON.stringify(knightPosArray) + ' knightPosArray need to check here ok.')
				const positionIndex = knightPosArray.findIndex(x => x.indexId === player.id);
				console.log(player.id + ' player.id for checking already set')
				console.log(positionIndex + ' positionIndex for checking already set')

				let positionRow = 0
				let positionColumn = 0
				try {
					positionRow = knightPosArray[positionIndex].row
					positionColumn = knightPosArray[positionIndex].column
				}
				catch {
					console.log('oh no. hit catch.')
					positionRow = 0
					positionColumn = 0
				}

				console.log(positionRow + ' positionRow hmm')
				console.log(positionColumn + ' positionColumn hmm')

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

					console.log(JSON.stringify(player) + ' player hmm')
					console.log(player.initials + ' player.initials hmm')
					console.log(player.row + ' player.row hmm')
					console.log(player.column + ' player.column hmm')

					if (initialLoad === false) {

						let highestSubs = []

					const knightsStillSubs = knightPosArray.reduce(function(acc, cur) {
						if ((cur.row >= 4) || (cur.row < 4 && cur.column <= 1)) {
							//return player
							acc.push(cur);
						}
					  return acc;
					}, []);

					console.log(JSON.stringify(knightsStillSubs) + ' knightsStillSubs hmm')

					let knightsStillSubsLowest = []

					if (knightsStillSubs !== null || knightsStillSubs !== [] || knightsStillSubs.length > 0) {

						try {
							knightsStillSubsLowest = knightsStillSubs.reduce((prev, curr) => prev.row >= curr.row ? prev : curr);
							console.log(knightsStillSubsLowest.row + 'knightsStillSubsLowest.column here.')
							//prevPlayerColumn = knightsStillSubsLowest.column
							//prevPlayerRow = knightsStillSubsLowest.row
						}
						catch {
							console.log('oh, we went in here 1.')
							//prevPlayerColumn = 0
							//prevPlayerRow = 0
						}

						console.log(JSON.stringify(knightsStillSubsLowest) + ' knightsStillSubsLowest chky here.')
						console.log(knightsStillSubsLowest.row + ' knightsStillSubsLowest.row  here.')

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
							console.log('oh, we went in here 1a.')
								//do nothing.
						}

						console.log(JSON.stringify(subsOnSameRow) + ' subsOnSameRow chky here.')

						let subWithHighestColumn = []

						try {
							subWithHighestColumn = subsOnSameRow.reduce((prev, curr) => prev.column > curr.column ? prev : curr);
							console.log(subWithHighestColumn.row + 'subWithHighestColumn.row here.')
							console.log(subWithHighestColumn.column + 'subWithHighestColumn.column here.')
							prevPlayerColumn = subWithHighestColumn.column
							prevPlayerRow = subWithHighestColumn.row
							//prevPlayerColumn = knightsStillSubsLowest.column
							//prevPlayerRow = knightsStillSubsLowest.row
							//countSubCheck++
						}
						catch {
							console.log('oh, we went in here 2.')
							//prevPlayerColumn = 0
							//prevPlayerRow = 0
						}

						console.log(JSON.stringify(subWithHighestColumn) + ' subWithHighestColumn chky here.')

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

				console.log(JSON.stringify(maxId) + ' maxId is what?')
				console.log(maxId.indexId + ' maxId.indexId is what?')
				console.log(player.id + ' player.id is what?')
				console.log(player.playerName + ' player.playerName is what?')
				console.log(initialLoad + ' initialLoad is what?')

				const knightsStillSubs = knightPosArray.reduce(function(acc, cur) {
					if ((cur.row >= 4) || (cur.row < 4 && cur.column <= 1)) {
						//return player
						acc.push(cur);
					}
					return acc;
				}, []);

				console.log(JSON.stringify(knightsStillSubs) + ' knightsStillSubs is what here?')


					if (maxId.indexId >= player.id && initialLoad === false) {
						console.log('Should mostly hit in here?')
						//positionDetailsRow = knightPosArray[positionIndex].row
						//positionDetailsColumn = knightPosArray[positionIndex].column
						playerPosDetailsArray[0].row = knightPosArray[positionIndex].row
						playerPosDetailsArray[0].column = knightPosArray[positionIndex].column
						//do nothing
					}
					else if ((knightsStillSubs.length <= 0 && initialLoad === false) || (knightsStillSubs === [] && initialLoad === false)) {
						console.log('how the are you getting in here?')
						playerPosDetailsArray[0].row = 0
						playerPosDetailsArray[0].column = 0
					}
					else {

				if (prevPlayerColumn === 1 & prevPlayerRow < 4) {
					console.log('hit in here 2')
					positionDetailsRow = prevPlayerRow + 1
					positionDetailsColumn = 0
				}
				else if (prevPlayerColumn === 8 & prevPlayerRow > 3) {
					console.log('hit in here 3')
					positionDetailsRow = prevPlayerRow + 1
					positionDetailsColumn = 0
					//countSubCheck = 0
				}
				else if (prevPlayerColumn === 0 & prevPlayerRow < 4) {
					console.log('hit in here 4')
					console.log(prevPlayerRow + ' prevPlayerRow what is 1?')
					console.log(prevPlayerColumn + ' prevPlayerColumn what is 1?')
					positionDetailsRow = prevPlayerRow
					positionDetailsColumn = 1
					console.log(positionDetailsRow + ' positionDetailsRow what is 1?')
					console.log(positionDetailsColumn + ' positionDetailsColumn what is 1?')
				}
				else {
					console.log('hit in here 5')
					console.log(prevPlayerRow + ' prevPlayerRow what is?')
					console.log(prevPlayerColumn + ' prevPlayerColumn what is?')
					positionDetailsRow = prevPlayerRow
					positionDetailsColumn = prevPlayerColumn + 1
					console.log(positionDetailsRow + ' positionDetailsRow what is?')
					console.log(positionDetailsColumn + ' positionDetailsColumn what is?')
				}
				console.log(playerPosDetailsArray + ' playerPosDetailsArray what is?')
				playerPosDetailsArray[0].row = positionDetailsRow
				playerPosDetailsArray[0].column = positionDetailsColumn
				console.log(JSON.stringify(playerPosDetailsArray) + ' playerPosDetailsArray check here.')
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
				/*
				console.log(JSON.stringify(knightPosArray) + ' posArray what do i have in here?')
				console.log(JSON.stringify(knightPosArray[posArrayLength]) + ' posArray[posArrayLength] stuffed it all up')
				playerPosDetailsArray = knightPosArray[posArrayLength]
				console.log('hit in here 6')
				console.log(JSON.stringify(player) + ' player what is?')
				console.log(JSON.stringify(player.positionDetails) + ' player.positionDetails what is?')
				console.log(JSON.stringify(player.positionDetails.row) + ' player.positionDetails.row what is?')
				console.log(JSON.stringify(player.positionDetails.column) + ' player.positionDetails.column what is?')
				positionDetailsRow = player.positionDetails.row
				positionDetailsColumn = player.positionDetails.column
				console.log(positionDetailsColumn + ' positionDetailsColumn what is?')
				console.log(positionDetailsRow + ' positionDetailsRow what is?')
				console.log(JSON.stringify(playerPosDetailsArray) + ' playerPosDetailsArray what do i see?')
				playerPosDetailsArray.row = positionDetailsRow
				playerPosDetailsArray.column = positionDetailsColumn
				*/
				playerPosDetailsArray = []
				playerPosDetailsArray.push(player.positionDetails)
			}

			if (_games[0].gameSetup === true) {
				console.log(player.id + ' player.id')
				indexId = player.id
				playerPosDetailsArray[0].indexId = indexId
				initials = player.playerName.match(/\b(\w)/g);
				playerPosDetailsArray[0].initials = initials
				playerPosDetailsArray[0].playerName = player.playerName
			}

			//Game time stats to do.

			gameTimeStats = player.positionDetails.gameTimeStats
			playerPosDetailsArray.gameTimeStats = gameTimeStats


			console.log(JSON.stringify(playerPosDetailsArray) + ' playerPosDetailsArray')
			posArray.push(playerPosDetailsArray[0])
		})

		console.log(JSON.stringify(posArray) + ' posArray')
		setKnightPosArray(posArray)
		setInitialLoad(false)

	}

	useEffect(() => {

		console.log(props.checkSortLive  + ' checkSortLive hit here into this ');
		console.log(props.showNewScreen  + ' showNewScreen hit here into this ');

		console.log(JSON.stringify(posArrayAll) + ' posArrayAll checking again here.');
		console.log(JSON.stringify(knightPosArray) + ' knightPosArray checking again here.');

		if (props.showNewScreen === false && checkSortLive > 0) {
			setKnightPosArray(posArrayAll)
		}
		else if (props.showNewScreen === false && checkSortLive <= 0) {
			setKnightPosArray(posArrayReset)
		}


	},[props.checkSortLive])

	const { width, height } = Dimensions.get('window');
	const boardWidth = Math.min(width, height) * 0.89;
	const squareWidth = boardWidth / 8;
	console.log(squareWidth + ' what is squareWidth?')
	const rowViews: JSX.Element[] = [];

	for (let row = 0; row < 7; row += 1) {
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

const positionBoxDisplays = (player) => {

	//let boxDisplay = ''
	console.log(player.indexId + ' what is player.indexId')
	console.log(JSON.stringify(knightPosArray) + ' what is knightPosArray')

	if (player.indexId >= 0) {
	console.log(player.row + ' what is player.row?? over here')
	console.log(player.column + ' what is player.column?? over here')
	let playerPos = ''
	if (player.row === 0 && player.column > 1) {
		playerPos = 'gol'
		dipatchPosChange(player, playerPos)
		return (
			<Box bg="fuchsia.200" minW="90%" minH="50%" shadow="9" rounded="md">
					<Text style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center', paddingTop: '4%', color: '#333'}}>{player.initials[0]}{player.initials[1]}</Text>
			</Box>
		)
	}
	if (player.row === 1 && player.column > 1) {
		playerPos = 'def'
		dipatchPosChange(player, playerPos)
		return (
			<Box bg="warning.200" minW="90%" minH="50%" shadow="9" rounded="md">
					<Text style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center', paddingTop: '4%', color: '#333'}}>{player.initials[0]}{player.initials[1]}</Text>
			</Box>
		)
	}
	if (player.row === 2 && player.column > 1) {
		playerPos = 'mid'
		dipatchPosChange(player, playerPos)
		return (
			<Box bg="yellow.100" minW="90%" minH="50%" shadow="9" rounded="md">
					<Text style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center', paddingTop: '4%', color: '#333'}}>{player.initials[0]}{player.initials[1]}</Text>
			</Box>
		)
	}
	if (player.row === 3 && player.column > 1) {
		playerPos = 'fwd'
		dipatchPosChange(player, playerPos)
		return (
			<Box bg="primary.100" minW="90%" minH="50%" shadow="9" rounded="md">
					<Text style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center', paddingTop: '4%', color: '#333'}}>{player.initials[0]}{player.initials[1]}</Text>
			</Box>
		)
	}
	if (player.row === 6) {
		playerPos = 'abs'
		dipatchPosChange(player, playerPos)
		return (
			<Box bg="#fb7185" minW="90%" minH="50%" shadow="9" rounded="md">
					<Text style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center', paddingTop: '4%', color: '#333'}}>{player.initials[0]}{player.initials[1]}</Text>
			</Box>
		)
	}
	else {
		playerPos = 'sub'
		dipatchPosChange(player, playerPos)
		return (
			<Box bg="emerald.200" minW="90%" minH="50%" shadow="9" rounded="md">
					<Text style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center', paddingTop: '4%', color: '#333'}}>{player.initials[0]}{player.initials[1]}</Text>
			</Box>
		)
	}
}

}

const dipatchPosChange = (player, playerPos) => {

	try {
	const playerIndexRaw = games[0].teamPlayers.findIndex(x => x.id === player.indexId);
	const currentPlayerPosition = games[0].teamPlayers[playerIndexRaw].currentPosition
	console.log(playerPos + ' playerPos')
	console.log(player.column + ' player.column')
	console.log(player.row + ' player.row')

	if (currentPlayerPosition !== playerPos) {
		console.log(player.indexId + ' player indexId. here to see how many times?')
		console.log(playerPos + ' playerPos')


			games[0].teamPlayers[playerIndexRaw].currentPosition = playerPos
			games[0].teamPlayers[playerIndexRaw].positionDetails.row = player.row
			games[0].teamPlayers[playerIndexRaw].positionDetails.column = player.column

			console.log(JSON.stringify(games[0].teamPlayers[playerIndexRaw]) + ' [0].teamPlayers[playerIndexRaw] checky herew.')

			let naCount = 0
			if (games[0].gameSetup === false) {
				const playerFromGame = games[0].teamPlayers[playerIndexRaw]
				const positionTimesSave = PositionTimes.savePositionTime(playerFromGame, secondsElapsed);
	      const positionTimesSaveFirst = positionTimesSave[0];
				console.log(positionTimesSaveFirst + ' positionTimesSaveFirst what is?')
	      games[0].teamPlayers[playerIndexRaw] = positionTimesSaveFirst

				console.log(playerPos + ' playerPos what is?')
				const positionTimesGet = PositionTimes.getPositionTime(playerFromGame, secondsElapsed, games[0].gameHalfTime, games[0].halfTime);
	      const positionTimesGetSecond = positionTimesGet[0];
	      naCount = positionTimesGet[1];
				console.log(positionTimesGetSecond + ' positionTimesGetSecond what is?')
	      games[0].teamPlayers[playerIndexRaw] = positionTimesGetSecond

				console.log(JSON.stringify(player) + ' player after adding position times.')

			}
			else {
				console.log(JSON.stringify(games[0].teamPlayers + ' check games[0].teamPlayers here for pos. dragDrop.'));
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

	    if (props.whereFrom === 1) {
	      //try {
	        if (playerPos === 'sub') {
	          games[0].gameEvents.push({eventType: 'sub', eventText: subText, eventTime: secondsElapsed})
	        }
	        else {
	          games[0].gameEvents.push({eventType: 'pos', eventText: subText, eventTime: secondsElapsed})
	        }
	    }




			console.log(JSON.stringify(games) + ' games after adding position times.')
			dispatch(updateGames(games))

			const teamIdCodeGames = games[0].teamIdCode
	    const gameIdDb = games[0].gameIdDb

			firestore().collection(teamIdCodeGames).doc(gameIdDb).update({
				 game: games[0],
			 })


	}
}
catch {
	// do nothing.
	console.log('erro hit need ')
	console.log(JSON.stringify(games[0].teamPlayers) + ' check games[0].teamPlayers here for pos. ERROR dragDrop.');
	console.log(playerPos + ' playerPos')
	console.log(player.column + ' player.column')
	console.log(player.row + ' player.row')
}



}

	const draxViewDisplay = () => {

		//let indexPlayer = 0


		const displayreturn = knightPosArray.map(player => {

			console.log(player.row + ' what is player.row??')
			console.log(player.column + ' what is player.column??')
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
						console.log(';just checking in a guess player.')

						//const playerIndexRaw = games[0].teamPlayers.findIndex(x => x.id === player.indexId);
						////console.log(playerIndexRaw + ' playerIndexRaw')
						//setPlayerIndex(playerIndexRaw)

						//dispatch(updatePlayerIndex(player.indexId))

						if (props.whereFrom === 1) {
							const playerIndexRawTwo = games[0].teamPlayers.findIndex(x => x.id === player.indexId);
							console.log(playerIndexRawTwo + ' playerIndexRawTwo')
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
						console.log('onDragEnd hit!')

						//dispatch(updatePlayerIndex(player.indexId))
						setMoving(false);

					}}
					onDragExit={() => {
						console.log('onDragExit hit!')



						const playerIndexRawTwo = games[0].teamPlayers.findIndex(x => x.id === player.indexId);
						console.log(playerIndexRawTwo + ' playerIndexRawTwo')
						setPlayerIndex(playerIndexRawTwo)



					}}
					onDragDrop={() => {

						console.log('onDragDrop hit!')
						setExitDrag(true)
						dispatch(updatePlayerIndex(true))
						setMoving(false);
						setPlayerPositionDisplayBoardText("" + player.playerName + "'s position updated to")
						console.log(playerPositionDisplayBoard + ' playerPositionDisplayBoard onDragDrop!')
						console.log(playerPositionDisplayBoardLatest + ' playerPositionDisplayBoardLatest on show position text!')
						console.log(playerIndexPos + ' playerIndexPos  on show position text')
						console.log(playerIndex + ' playerIndexPos  on show position text')


						const playerIndexRaw = games[0].teamPlayers.findIndex(x => x.id === playerIndexPos);
						let playerPosDisplay = ''
						try {
							playerPosDisplay = games[0].teamPlayers[playerIndexRaw].currentPosition
						}
						catch {
							console.log('some reasom this is hit! mm kay');
							playerPosDisplay = 'sub'
						}
						setPlayerPositionOld(playerPosDisplay)

						setPlayerPositionDisplayBoard(true)
						console.log(playerPositionDisplayBoard + ' playerPositionDisplayBoard onDragDrop 2!')

						setTimeout(function(){
							console.log(playerPositionDisplayBoard + ' playerPositionDisplayBoard onDragDrop 3!')
							setPlayerPositionDisplayBoard(false)
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
		console.log('is hit one huh');
		console.log('is hit one huh')

		if (games[0].teamPlayers.length > 1 && whereFrom === 1) {
			console.log('is hit two huh')
			return (
				<SelectPlayerStats navigation={props.navigation} whereFrom={props.whereFrom} playerIndex={playerIndex} teamId={props.teamId} newDisplay={true} />

			)
		}
	}

	const checkPlayerCount = () => {

		try {
			console.log(games[0].teamPlayers.length + ' whats the numner?')

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

		console.log(whereFrom + ' whats whereFrom numner?')

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

		console.log(whereFrom + ' whats whereFrom numner?')

		console.log(props.teamId + ' props.teamId owkring?')

		console.log(playerIndex + ' playerIndex owkring?')
		console.log(playerIndexPos + ' playerIndex owkring?')
		//let playerIndexPosTemp = playerIndexPos
		//playerIndexPosTemp++
		console.log(JSON.stringify(games[0].teamPlayers[playerIndex]) + ' games[0].teamPlayers[playerIndex] owkring?')

		console.log(props.whereFrom + ' props.whereFrom owkring?')
		console.log(props.isOpen + ' props.isOpen owkring?')


		try {

			console.log(' how often hitting?')

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

		console.log(playerPositionDisplayBoardLatest + ' playerPositionDisplayBoardLatest on show position text!')
		console.log(playerPositionOld + ' playerPositionOld  on show position text')
		console.log(playerIndex + ' playerIndexPos  on show position text')

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

		console.log(currentPosText + ' currentPosText herey checky')
		console.log(playerPositionOld + ' playerPositionOld herey checky..')

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
						<Center style={{position:'absolute', left: 0, top: 180, height: 'auto'}} mt="2" pl="0" rounded="lg" minW="100%" _text={{
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

		console.log(seasonsDisplayId + ' what did it say about iut');

		if (seasonsDisplayId === 99999998) {
      Alert.alert("Please select a Current Season before you continue." )
    }
		else {

			console.log(JSON.stringify(knightPosArray) + ' check posArray before going to Sortpage.');

			dispatch(updatePosArray(knightPosArray, knightPosArray))

			const checkSortLiveNew = checkSortLive + 1
			setCheckSort(checkSortLiveNew)

			/*
			if (knightPosArray === undefined) {
				console.log('knightPosArray === undefinded!');

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

		console.log(JSON.stringify(knightPosArray) + ' checking knightPosArray');

		//knightPosArray[positionIndex].row

		let hasAbsentPlayer = false
		knightPosArray.map(player => {
			console.log(player.row + ' player.row');

			if (player.row === 6) {
				hasAbsentPlayer = true
			}

		})


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


	}

	const backButton = () => {
		console.log(JSON.stringify(knightPosArray) + ' check posArray before going to Sortpage.');

		dispatch(updatePosArray(knightPosArray, knightPosArray))

		const checkSortLiveNew = checkSortLive + 1
		setCheckSort(checkSortLiveNew)

		/*
		if (knightPosArray === undefined) {
			console.log('knightPosArray === undefinded!');

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

	return (
		<Box>
			{checkPositionChangeDisplay()}

		<DraxProvider>
			<View style={styles.container}>
				<View style={styles.containerRow}>
				{props.sortPage !== true && props.hideBtn !== 1 &&
					<View>
						{displaySelectSeason()}
						{instructionsTextDragDropNew()}
					</View>
				}



				{props.hideBtn !== 1 &&
					<Box>
				<ImageBackground source={require(`../../assets/soccerFeild-drag-drop-five-with-red.png`)} resizeMode="stretch" imageStyle={{ }} style={styles.backgroundImage}>
					<View style={styles.board}>
						{rowViews}
						{draxViewDisplay()}
					</View>
					</ImageBackground>
					{dragAbsent()}
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
					</Box>
				}



				</View>
			</View>
		</DraxProvider>
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
	linearGradientBtn: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
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
