import React, { useEffect, useState, Component, useRef } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight, ImageBackground, Alert, PixelRatio, Animated, ActivityIndicator, Dimensions } from 'react-native'
import { NativeBaseProvider, Container, Header, Content, List, ListItem, Text, Row, Col, H3, H2, Footer, Picker, Form, Button, Center, Heading, Box, PresenceTransition, HStack, VStack, Image } from 'native-base';
import { useSelector, useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import YoutubePlayer from 'react-native-youtube-iframe';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import SoccerIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const myIcon = <Icon name="rocket" size={30} color="#900" />;
const barChart = <Icon name="bar-chart" size={26} color="#E879F9" />;
const history = <Icon name="history" size={26} color="#E879F9" />;
const plusCircle = <IconAnt name="pluscircleo" size={50} color="#fff" />;
const plus = <IconAnt name="plus" size={30} color="#fff" />;
const users = <Icon name="users" size={15} color="#E879F9" style={{backgroundColor: 'rgba(232,121,249,0.2)', padding: 10}} />;
const chevronRight = <Icon name="chevron-right" size={20} color="#999" />;
const chevronRightWhite = <Icon name="chevron-right" size={20} color="#fff" />;
const doubleright = <IconAnt name="doubleright" size={50} color="#fff" />;
const arrowrightcircle = <FeatherIcon name="arrow-right-circle" size={40} color="#fff" />;
const arrowrightcircleSmall = <FeatherIcon name="arrow-right-circle" size={26} color="#000" />;
const arrowdowncircle = <FeatherIcon name="arrow-down-circle" size={26} color="#fff" />;
const feildIcon = <SoccerIcon name="soccer" size={40} color="#E879F9" />;
const trafficLightIcon = <SoccerIcon name="traffic-light-outline" size={25} color="#E879F9" style={{backgroundColor: 'rgba(232,121,249,0.2)', padding: 10}} />;



import * as Animatable from 'react-native-animatable';

import Purchases from 'react-native-purchases';

import KickOff from '../Game/KickOff.js'

import { updateGames } from '../../Reducers/games';
import { updateTeamPlayers } from '../../Reducers/teamPlayers';
import { updateStopwatch } from '../../Reducers/stopwatch';
import { updateTeamNames } from '../../Reducers/teamNames';
import { updateSeasons } from '../../Reducers/seasons';
import { updateIap } from '../../Reducers/iap';
import { updateUserProfile } from '../../Reducers/userProfile';
import { updateCheckSort } from '../../Reducers/checkSort';

const DrillsInstructions = (props)=>{

  const [getTeam, setGetTeam] = useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [getHalfTimeFlag, setHalfTimeFlag] = useState(0);
  const [posts, setPosts] = useState();
  const [animateLoading, setAnimateLoading] = useState(false);
  const [hideCircle, setHideCircle] = useState(true);

  let games = useSelector(state => state.games.games);
  let teamPlayers = useSelector(state => state.teamPlayers.teamPlayers);
  let teamNames = useSelector(state => state.teamNames.teamNames);
  let seasons = useSelector(state => state.seasons.seasons);
  let pro_forever_indiv = useSelector(state => state.iap.pro_forever_indiv);
  let pro_yearly_indiv = useSelector(state => state.iap.pro_yearly_indiv);
  let pro_yearly_team = useSelector(state => state.iap.pro_yearly_team);
  let pro_forever_team = useSelector(state => state.iap.pro_forever_team);
  let pro_yearly_player = useSelector(state => state.iap.pro_yearly_player);
  let pro_forever_player = useSelector(state => state.iap.pro_forever_player);
  let seasonsDisplayId = useSelector(state => state.seasons.seasonsDisplayId);
  let userProfile = useSelector(state => state.userProfile.userProfile);

  const dispatch = useDispatch()

  const { currentUser } = auth()
  let userRef = null
  try {
  userRef = firestore().collection(currentUser.uid);
  }
  catch {
    //do nothing.
  }
  const teamRef = firestore().collection('teamTest1')

  const { navigate } = props.navigation;

  let drillOption = 9999

  try {
    drillOption = props.route.params.drillOption
  }
  catch {
    //nothing.
  }

    const teams = useRef();

    const proPage = () => {
      navigate('Iap');
    }

    const proUpgrade = () => {

      let advancedVariations = 0
      if (drillOption === 0) {
        advancedVariations = 6
      }
      else if (drillOption === 1) {
        advancedVariations = 5
      }
      else if (drillOption === 2) {
        advancedVariations = 8
      }
      else if (drillOption === 3) {
        advancedVariations = 8
      }
      else if (drillOption === 4) {
        advancedVariations = 6
      }
      else if (drillOption === 5) {
        advancedVariations = 6
      }

      console.log(JSON.stringify(pro_yearly_indiv) + ' pro_yearly_indiv check');

      if (pro_forever_indiv[0].purchased === true || pro_yearly_indiv[0].purchased === true || pro_yearly_team[0].purchased === true || pro_forever_team[0].purchased === true || pro_yearly_player[0].purchased === true || pro_forever_player[0].purchased === true) {

        if (drillOption === 0) {
          return (
            <Box>
              <HStack>
                <Text style={styles.instrucDot}>{`\u2022`}</Text>
                <Text style={styles.instrucText}>
                  <Text style={{fontWeight: '800', color: '#E879F9'}}>Left-foot/right-Foot</Text> When the coach calls out “Green Light” - add "Left foot only" or "Right foot only"
                </Text>
              </HStack>
              <HStack>
                <Text style={styles.instrucDot}>{`\u2022`}</Text>
                <Text style={styles.instrucText}>
                  <Text style={{fontWeight: '800', color: '#E879F9'}}>Use both feet:</Text> Require players to alternate using both feet while dribbling, making it harder to maintain control when dribbling at high speed.
                </Text>
              </HStack>
              <HStack>
                <Text style={styles.instrucDot}>{`\u2022`}</Text>
                <Text style={styles.instrucText}>
                  <Text style={{fontWeight: '800', color: '#E879F9'}}>Add cones or markers:</Text> Place cones or other obstacles around the area that players need to navigate around. This forces players to change direction more frequently and with greater precision.
                </Text>
              </HStack>
              <HStack>
                <Text style={styles.instrucDot}>{`\u2022`}</Text>
                <Text style={styles.instrucText}>
                  <Text style={{fontWeight: '800', color: '#E879F9'}}>Zig-zag dribbling:</Text>
                </Text>
              </HStack>
              <HStack ml="10">
                <Text style={styles.instrucDot}>{`\u2022`}</Text>
                <Text style={styles.instrucText}>
                  Place two domes at the starting point and have players line up behind them. Next, set up five additional domes, spaced 5 yards apart, in front of the two lines for the players to "slalom" through.
                </Text>
              </HStack>
              <HStack ml="10">
                <Text style={styles.instrucDot}>{`\u2022`}</Text>
                <Text style={styles.instrucText}>
                  Have players dribble in a zig-zag pattern through the course during “Green Light,” which forces more agility and extra control when "Red Light" is called.
                </Text>
              </HStack>
              <HStack>
                <Text style={styles.instrucDot}>{`\u2022`}</Text>
                <Text style={styles.instrucText}>
                  <Text style={{fontWeight: '800', color: '#E879F9'}}>Freeze in different positions:</Text> When “Red Light” is called, players could be asked to freeze in specific positions (e.g., balancing on one foot, in a crouched position, or with one hand raised).
                </Text>
              </HStack>
              <HStack>
                <Text style={styles.instrucDot}>{`\u2022`}</Text>
                <Text style={styles.instrucText}>
                  <Text style={{fontWeight: '800', color: '#E879F9'}}>Defenders in the grid:</Text> Add one or two defenders into the area who can try to steal the ball from the players. This will force players to be more aware of their surroundings and improve their decision-making under pressure.
                </Text>
              </HStack>
            </Box>

          )
        }
        else if (drillOption === 1) {
          return (
            <Box>
            <HStack>
              <Text style={styles.instrucDot}>{`\u2022`}</Text>
              <Text style={styles.instrucText}>
                <Text style={{fontWeight: '800', color: '#E879F9'}}>Pass with non-dominant foot:</Text> Have players pass with their non-dominant foot (e.g., right-footed players must pass with their left foot).
              </Text>
              </HStack>
              <HStack>
                <Text style={styles.instrucDot}>{`\u2022`}</Text>
                <Text style={styles.instrucText}>
                  <Text style={{fontWeight: '800', color: '#E879F9'}}>Add Pressure with Defenders:</Text>
                </Text>
                </HStack>
                <HStack ml="10">
                  <Text style={styles.instrucDot}>{`\u2022`}</Text>
                  <Text style={styles.instrucText}>
                    Introduce a defender or two in the area who can try to intercept passes. This will add pressure, forcing players to focus on more precise, quicker passes.
                  </Text>
                </HStack>
                <HStack ml="10">
                  <Text style={styles.instrucDot}>{`\u2022`}</Text>
                  <Text style={styles.instrucText}>
                    Players need to time their passes better, considering the defender’s positioning.
                  </Text>
                </HStack>
                <HStack>
                  <Text style={styles.instrucDot}>{`\u2022`}</Text>
                  <Text style={styles.instrucText}>
                    <Text style={{fontWeight: '800', color: '#E879F9'}}>Change Pass Types:</Text>
                  </Text>
                  </HStack>
                  <HStack ml="10">
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Incorporate different types of passes (e.g., inside of the foot, outside of the foot, driven passes, chip passes, etc.) to encourage versatility.
                    </Text>
                  </HStack>
                  <HStack ml="10">
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Each round could focus on a specific passing technique to help players refine different aspects of their passing game.
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      <Text style={{fontWeight: '800', color: '#E879F9'}}>Use Obstacles:</Text>
                    </Text>
                    </HStack>
                    <HStack ml="10">
                      <Text style={styles.instrucDot}>{`\u2022`}</Text>
                      <Text style={styles.instrucText}>
                        Add cones or other obstacles around the domes to force players to pass with even more precision and accuracy.
                      </Text>
                    </HStack>
                    <HStack ml="10">
                      <Text style={styles.instrucDot}>{`\u2022`}</Text>
                      <Text style={styles.instrucText}>
                        The obstacles can be small cones in front of the domes or markers that require players to pass the ball around them to successfully get it through the gate.
                      </Text>
                    </HStack>
                    <HStack>
                      <Text style={styles.instrucDot}>{`\u2022`}</Text>
                      <Text style={styles.instrucText}>
                        <Text style={{fontWeight: '800', color: '#E879F9'}}>Time Challenge:</Text>
                      </Text>
                      </HStack>
                      <HStack ml="10">
                        <Text style={styles.instrucDot}>{`\u2022`}</Text>
                        <Text style={styles.instrucText}>
                          Set a time limit for players to make a certain number of successful passes through the gate. This adds an element of competition and pressure.
                        </Text>
                      </HStack>
                      <HStack ml="10">
                        <Text style={styles.instrucDot}>{`\u2022`}</Text>
                        <Text style={styles.instrucText}>
                          For example, players must successfully pass through the gates 10 times in 2 minutes without hitting the domes. As they improve, reduce the time allowed or increase the number of passes.
                        </Text>
                      </HStack>
                      <HStack ml="10">
                        <Text style={styles.instrucDot}>{`\u2022`}</Text>
                        <Text style={styles.instrucText}>
                          You can also add an extra challenge by having players start from 0 if they miss or hit the gate.
                        </Text>
                      </HStack>
                    </Box>
          )
        }
        else if (drillOption === 2) {
          return (
            <Box>
            <HStack>
              <Text style={styles.instrucDot}>{`\u2022`}</Text>
              <Text style={styles.instrucText}>
                <Text style={{fontWeight: '800', color: '#E879F9'}}>Bouncing ball:</Text> The coach throws the ball high, giving the players a chance to control the bouncing ball before splitting into attack & defence.
              </Text>
              </HStack>
            <HStack>
              <Text style={styles.instrucDot}>{`\u2022`}</Text>
              <Text style={styles.instrucText}>
                <Text style={{fontWeight: '800', color: '#E879F9'}}>Non-dominant foot:</Text> Only allow the  attacker to shoot with their non-dominant foot (e.g., right-footed players must shoot with their left foot).
              </Text>
              </HStack>
              <HStack>
                <Text style={styles.instrucDot}>{`\u2022`}</Text>
                <Text style={styles.instrucText}>
                  <Text style={{fontWeight: '800', color: '#E879F9'}}>Team defense:</Text> Position a "support defender" slightly behind whoever becomes the primary defender. The "support defender" is rotated out every 3 or 4 turns.
                </Text>
              </HStack>
              <HStack>
                <Text style={styles.instrucDot}>{`\u2022`}</Text>
                <Text style={styles.instrucText}>
                  <Text style={{fontWeight: '800', color: '#E879F9'}}>Introduce a time limit:</Text> Set a time limit (e.g., 5 seconds) for players to attack the goal after getting possession of the ball. This encourages quick decision-making, dribbling under pressure, and shooting quickly.
                </Text>
              </HStack>
              <HStack>
                <Text style={styles.instrucDot}>{`\u2022`}</Text>
                <Text style={styles.instrucText}>
                  <Text style={{fontWeight: '800', color: '#E879F9'}}>Smaller goals:</Text> Use a smaller goal or goal box to make the shot more challenging for the attacker.
                </Text>
              </HStack>
              <HStack>
                <Text style={styles.instrucDot}>{`\u2022`}</Text>
                <Text style={styles.instrucText}>
                  <Text style={{fontWeight: '800', color: '#E879F9'}}>Larger playing area:</Text> Increase the size of the area the players are working in. A larger field requires the attacker to cover more ground and make decisions about changing direction and speed, and it gives the defender more space to close down.
                </Text>
              </HStack>
              <HStack>
                <Text style={styles.instrucDot}>{`\u2022`}</Text>
                <Text style={styles.instrucText}>
                  <Text style={{fontWeight: '800', color: '#E879F9'}}>Make the goalkeeper active:</Text> Add a goalkeeper to the goal. This forces the attacker to not only beat the defender but also finish their attack with a shot on goal, improving both attacking and shooting skills. If available, you can use a real goal for this exersice.
                </Text>
              </HStack>
              <HStack>
                <Text style={styles.instrucDot}>{`\u2022`}</Text>
                <Text style={styles.instrucText}>
                  <Text style={{fontWeight: '800', color: '#E879F9'}}>Introduce dribbling obstacles:</Text> Add cones or markers in the field to force the attacker to dribble around them before attacking the goal. This adds more complexity to the attacker’s decision-making and ball control under pressure.
                </Text>
              </HStack>
            </Box>

          )
        }
        else if (drillOption === 3) {
          return (
            <Box>
            <HStack>
              <Text style={styles.instrucDot}>{`\u2022`}</Text>
              <Text style={styles.instrucText}>
                <Text style={{fontWeight: '800', color: '#E879F9'}}>Increase the Size of the Field:</Text>  Increase the size of the playing area to give players more space to work with. This will help the minnows develop better dribbling control and awareness while under pressure.
              </Text>
            </HStack>
            <HStack>
              <Text style={styles.instrucDot}>{`\u2022`}</Text>
              <Text style={styles.instrucText}>
                <Text style={{fontWeight: '800', color: '#E879F9'}}>Decrease the Size of the Field:</Text>  Alternatively, decrease the size of the field to make it more challenging, forcing the minnows to move quickly and shield the ball effectively.
              </Text>
            </HStack>
            <HStack>
              <Text style={styles.instrucDot}>{`\u2022`}</Text>
              <Text style={styles.instrucText}>
                <Text style={{fontWeight: '800', color: '#E879F9'}}>Set number of dribbles:</Text>  Challenge the minnows to complete the task within a set number of dribbles (e.g., no more than 5 touches per player).
              </Text>
            </HStack>
            <HStack>
              <Text style={styles.instrucDot}>{`\u2022`}</Text>
              <Text style={styles.instrucText}>
                <Text style={{fontWeight: '800', color: '#E879F9'}}>Alternate foot:</Text>  You could alternate between rounds where they use only their dominant foot and then rounds where they use their non-dominant foot.
              </Text>
            </HStack>
            <HStack>
              <Text style={styles.instrucDot}>{`\u2022`}</Text>
              <Text style={styles.instrucText}>
                <Text style={{fontWeight: '800', color: '#E879F9'}}>Advanced player challenge:</Text> To challenge the more advanced players, specifically have them use their non-dominant foot.
              </Text>
            </HStack>
            <HStack>
              <Text style={styles.instrucDot}>{`\u2022`}</Text>
              <Text style={styles.instrucText}>
                <Text style={{fontWeight: '800', color: '#E879F9'}}>Add a Goal or Target:</Text> You could also have mini-goals where the minnows have to dribble through or pass through before getting to the other side.
              </Text>
            </HStack>
            <HStack>
              <Text style={styles.instrucDot}>{`\u2022`}</Text>
              <Text style={styles.instrucText}>
                <Text style={{fontWeight: '800', color: '#E879F9'}}>Start in different positions:</Text> You can have sharks start in different positions on the field to prevent minnows from predicting their movement. For example, start at the side of the field where the sharks must rush into the middle to stop the minnows, or have the sharks start behind the minnows and chase them down to defend.
              </Text>
            </HStack>
            <HStack>
              <Text style={styles.instrucDot}>{`\u2022`}</Text>
              <Text style={styles.instrucText}>
                <Text style={{fontWeight: '800', color: '#E879F9'}}>Making a pass:</Text> Pair up the minnows, giving each pair one ball. Instead of simply dribbling to the other side, the minnows must pass the ball to their partner and receive a return pass before moving to the other side. This encourages them to focus on their decision-making and passing technique while dribbling.
              </Text>
            </HStack>
            </Box>

          )
        }
        else if (drillOption === 4) {
          return (
            <Box>
            <HStack>
              <Text style={styles.instrucDot}>{`\u2022`}</Text>
              <Text style={styles.instrucText}>
                <Text style={{fontWeight: '800', color: '#E879F9'}}>Different techniques:</Text> Practice different techniques provided by the coach (e.g., pull-backs, feints, step-overs, etc.). After a "knockout" round the coach can say "Dribble, pullbacks!".
              </Text>
              </HStack>
              <HStack ml="10">
                <Text style={styles.instrucDot}>{`\u2022`}</Text>
                <Text style={styles.instrucText}>
                  <Text style={{fontWeight: '800', color: '#E879F9'}}>Pull-backs:</Text> The player steps on the ball with the inside or sole of their foot, drags it backward, and then quickly accelerates in the opposite direction.
                </Text>
              </HStack>
              <HStack ml="10">
                <Text style={styles.instrucDot}>{`\u2022`}</Text>
                <Text style={styles.instrucText}>
                  <Text style={{fontWeight: '800', color: '#E879F9'}}>Step-overs:</Text> The player steps around the ball with their dominant foot in a circular motion, faking one direction, then quickly uses their other foot to push the ball in the opposite direction.
                </Text>
              </HStack>
              <HStack ml="10">
                <Text style={styles.instrucDot}>{`\u2022`}</Text>
                <Text style={styles.instrucText}>
                  <Text style={{fontWeight: '800', color: '#E879F9'}}>Feints:</Text> Involve subtle body movements, changes in speed, or quick shifts in direction to confuse the defender. Common examples of feints include the body fake, and the "shoulder drop."
                </Text>
              </HStack>
              <HStack>
                <Text style={styles.instrucDot}>{`\u2022`}</Text>
                <Text style={styles.instrucText}>
                  <Text style={{fontWeight: '800', color: '#E879F9'}}>Increase the Ball Knockout Pressure:</Text> Allow the players who knock out a ball to stay in the game and try to knock out more balls, turning it into a multi-phase game where players have to worry about other people trying to knock out their ball.
                </Text>
              </HStack>
              <HStack>
                <Text style={styles.instrucDot}>{`\u2022`}</Text>
                <Text style={styles.instrucText}>
                  <Text style={{fontWeight: '800', color: '#E879F9'}}>Introduce a "Safe Zone":</Text> Create a safe zone (like a small corner of the grid) where players can rest briefly if they need to avoid getting their ball knocked out, but they can only stay for a few seconds before they must re-enter the fray. This adds a tactical element, requiring players to judge when to make a break for the safe zone and when to stay in the game.
                </Text>
              </HStack>
              <HStack>
                <Text style={styles.instrucDot}>{`\u2022`}</Text>
                <Text style={styles.instrucText}>
                  <Text style={{fontWeight: '800', color: '#E879F9'}}>Change the Knockout Rule:</Text> Instead of requiring players to perform toe touches when their ball is knocked out, introduce a different penalty like having to complete dribbling drills (e.g., slalom dribbling through cones, 5-10 jumping jacks or 5 burpees) before returning to the game.
                </Text>
              </HStack>
              <HStack>
                <Text style={styles.instrucDot}>{`\u2022`}</Text>
                <Text style={styles.instrucText}>
                  <Text style={{fontWeight: '800', color: '#E879F9'}}>Add Team Competition:</Text> Break the players into teams where they must work together to eliminate players from the opposing team while keeping their own players safe. This adds a competitive team element and forces players to be strategic.
                </Text>
              </HStack>
              <HStack>
                <Text style={styles.instrucDot}>{`\u2022`}</Text>
                <Text style={styles.instrucText}>
                  <Text style={{fontWeight: '800', color: '#E879F9'}}>Use Cones for Obstacles:</Text> Place cones or other obstacles in the grid to force players to weave through or around them while trying to protect their ball. This increases the difficulty of dribbling, requiring more precise control and maneuvering under pressure.
                </Text>
              </HStack>
            </Box>

          )
        }
        else if (drillOption === 5) {
          return (
            <Box>
            <HStack>
              <Text style={styles.instrucDot}>{`\u2022`}</Text>
              <Text style={styles.instrucText}>
                <Text style={{fontWeight: '800', color: '#E879F9'}}>Shooting under different angles:</Text> Place a dome at various positions around the area, including wide angles or from deeper distances. The domes are the 'shooting area' to help simulate in-game shooting situations.
              </Text>
            </HStack>
            <HStack>
                <Text style={styles.instrucDot}>{`\u2022`}</Text>
                <Text style={styles.instrucText}>
                  <Text style={{fontWeight: '800', color: '#E879F9'}}>Set time limits:</Text> Add a time constraint for players to make their shot, increasing urgency. For example, players have 5 seconds to shoot once they receive the ball.
                </Text>
              </HStack>
              <HStack>
                <Text style={styles.instrucDot}>{`\u2022`}</Text>
                <Text style={styles.instrucText}>
                  <Text style={{fontWeight: '800', color: '#E879F9'}}>Vary the service:</Text> Instead of always serving the ball directly to the player, have the coach serve from different angles, including quick rolls, lofted passes, or even unpredictable bounces to simulate a real game.
                </Text>
              </HStack>
              <HStack>
                <Text style={styles.instrucDot}>{`\u2022`}</Text>
                <Text style={styles.instrucText}>
                  <Text style={{fontWeight: '800', color: '#E879F9'}}>Reduce the size of the goals:</Text> Use smaller goals or create "target zones" within the goals to challenge players to aim more precisely, improving their shooting accuracy under pressure.
                </Text>
              </HStack>
              <HStack>
                <Text style={styles.instrucDot}>{`\u2022`}</Text>
                <Text style={styles.instrucText}>
                  <Text style={{fontWeight: '800', color: '#E879F9'}}>Introduce Defenders:</Text> Add a "support defender" to the drill. This defender can add extra pressure as the attacker approaches the goals, forcing the attacker to make quicker decisions and take more accurate shots under pressure. The "support defender" is rotated out every 3 or 4 turns.
                </Text>
              </HStack>
              <HStack>
                <Text style={styles.instrucDot}>{`\u2022`}</Text>
                <Text style={styles.instrucText}>
                  <Text style={{fontWeight: '800', color: '#E879F9'}}>Limit Touches:</Text> Impose a touch limit (e.g., 2-3 touches) on the players before they must shoot. This will push them to take quicker, more decisive touches and focus on their first touch and decision-making.
                </Text>
              </HStack>
            </Box>

          )
        }
        else {
          return (
            <Box>
              <Heading mt="5" style={{color: '#fff'}}>ERROR!</Heading>
              <Text style={{color: '#ccc', marginBottom: 5}}>Press back and try another drill</Text>
            </Box>
          )
        }
      }
      else {
        return (
          <Box>
            <Button bg="transparent" p="0" onPress={() => proPage()}>
              <Box bg="#222" mb="0">
                <Box style={{backgroundColor: '#FACC15', maxWidth: '100%', minWidth: '100%', borderTopLeftRadius: 5, borderTopRightRadius: 5, paddingTop: 5, justifyContent: 'center', alignItems: 'center', paddingBottom: 5, paddingLeft: 15, paddingRight: 15}}><Text style={{fontSize: 16, fontWeight: '600'}}>UPGRADE TO PRO</Text></Box>
              </Box>
            </Button>
            <Box style={{backgroundColor: 'rgba(232,121,249,0.6)', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, paddingTop: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 40}}>
              <Text style={styles.instrucText}>Upgrade to Pro for access to advanced techniques and expert tips that will elevate the difficulty of this drill, while boosting fun and engagement for your team!</Text>
              <Text style={styles.instrucTextPink}>This drill includes <Text style={styles.instrucText}>{advancedVariations}</Text> extra advanced variations when you upgrade to pro!</Text>
              <Button bg="#E879F9" _text={{fontSize: 16}} mt="5" onPress={() => proPage()}>
                View Upgrade Options
              </Button>

            </Box>
          </Box>
        )
      }
    }


    const drillHeading = () => {


      if (drillOption === 0) {
        return (
          <Box>
            <Heading mt="5" style={{color: '#fff'}}>Read Light / Green Light</Heading>
            <Text style={{color: '#E879F9', marginBottom: 5, fontSize: 16, paddingBottom: 20}}>Ideal for young players to improve their dribbling skills</Text>
          </Box>

        )
      }
      else if (drillOption === 1) {
        return (
          <Box>
            <Heading mt="5" style={{color: '#fff'}}>Passing Through the Gate</Heading>
            <Text style={{color: '#E879F9', marginBottom: 5, fontSize: 16, paddingBottom: 20}}>Ideal for the young players to improve passing accuracy</Text>
          </Box>

        )
      }
      else if (drillOption === 2) {
        return (
          <Box>
            <Heading mt="5" style={{color: '#fff'}}>1v1 Race To The Ball</Heading>
            <Text style={{color: '#E879F9', marginBottom: 5, fontSize: 16, paddingBottom: 20}}>Ideal for the young players to improve their shooting accuracy and learn how to defened</Text>
          </Box>

        )
      }
      else if (drillOption === 3) {
        return (
          <Box>
            <Heading mt="5" style={{color: '#fff'}}>Sharks and Minnows</Heading>
            <Text style={{color: '#E879F9', marginBottom: 5, fontSize: 16, paddingBottom: 20}}>Ideal for the young players to learn how to dribble away from pressure</Text>
          </Box>

        )
      }
      else if (drillOption === 4) {
        return (
          <Box>
            <Heading mt="5" style={{color: '#fff'}}>Knockout!</Heading>
            <Text style={{color: '#E879F9', marginBottom: 5, fontSize: 16, paddingBottom: 20}}>Ideal for young players to improve dribbling and spatial awareness</Text>
          </Box>

        )
      }
      else if (drillOption === 5) {
        return (
          <Box>
            <Heading mt="5" style={{color: '#fff'}}>4 Goal Shoot</Heading>
            <Text style={{color: '#E879F9', marginBottom: 5, fontSize: 16, paddingBottom: 20}}>Ideal for the young players to practice shooting, attacking the goal and defending</Text>
          </Box>

        )
      }
      else if (drillOption === 6) {
        return (
          <Box>
            <Heading mt="5" style={{color: '#fff'}}>Soccer Freeze Tag</Heading>
            <Text style={{color: '#E879F9', marginBottom: 5, fontSize: 16, paddingBottom: 20}}>Ideal for coaches to manage low-skilled players with high-skilled players within the same drill</Text>
          </Box>

        )
      }
      else {
        return (
          <Box>
            <Heading mt="5" style={{color: '#fff'}}>ERROR!</Heading>
            <Text style={{color: '#ccc', marginBottom: 5}}>Press back and try another drill</Text>
          </Box>
        )
      }


    }
    const displayAnimation = () => {

      if (drillOption === 0) {
        if (Platform.OS === 'ios') {
          return (
            <VStack justifyContent="center" alignItems="center" mb={6} mt={5} >
                <Image key={"greenlight"} size={"2xl"} resizeMode="cover"
                source={require('../../assets/soccer_drills-red_light_green_light.gif')}
                alt={"Alternate Text "} style={{borderRadius: 15, borderColor: '#fff', borderWidth: 1}} />
            </VStack>
          )
        }
        else {
          return (
            <View style={styles.containerYouTube}>
              <YoutubePlayer
                height={210}
                videoId={'fKi0hYv3nec'}
              />
            </View>
          )
        }
      }
      else if (drillOption === 1) {
        if (Platform.OS === 'ios') {
          return (
            <VStack justifyContent="center" alignItems="center" mb={6} mt={5} >
              <Image key={"gate"} size={"2xl"} resizeMode="cover"
              source={require('../../assets/soccer_drills-passing_through_the_gates.gif')}
              alt={"Alternate Text "} style={{borderRadius: 15, borderColor: '#fff', borderWidth: 1}} />
            </VStack>
          )
        }
        else {
          return (
            <View style={styles.containerYouTube}>
              <YoutubePlayer
                height={210}
                videoId={'sl4p63i9-50'}
              />
            </View>
          )
        }
      }
      else if (drillOption === 2) {
        if (Platform.OS === 'ios') {
          return (
            <VStack justifyContent="center" alignItems="center" mb={6} mt={5} >
                <Image key={"1v1Race"} size={"2xl"} resizeMode="cover"
                source={require('../../assets/soccer_drill-1v1_race_to_the_ball.gif')}
                alt={"Alternate Text "} style={{borderRadius: 15, borderColor: '#fff', borderWidth: 1}} />
            </VStack>
          )
        }
        else {
          return (
            <View style={styles.containerYouTube}>
              <YoutubePlayer
                height={210}
                videoId={'5r-vBS4Sl6Q'}
              />
            </View>
          )
        }
      }
      else if (drillOption === 3) {
        if (Platform.OS === 'ios') {
          return (
            <VStack justifyContent="center" alignItems="center" mb={6} mt={5} >
                  <Image key={"sharks"} size={"2xl"} resizeMode="cover"
                  source={require('../../assets/soccer_drills-sharks_vs_minnows.gif')}
                  alt={"Alternate Text "} style={{borderRadius: 15, borderColor: '#fff', borderWidth: 1}} />
              </VStack>
          )
        }
        else {
          return (
            <View style={styles.containerYouTube}>
              <YoutubePlayer
                height={210}
                videoId={'JYjCvK87d-s'}
              />
            </View>
          )
        }
      }
      else if (drillOption === 4) {
        if (Platform.OS === 'ios') {
          return (
            <VStack justifyContent="center" alignItems="center" mb={6} mt={5} >
                <Image key={"knockout"} size={"2xl"} resizeMode="cover"
                source={require('../../assets/soccer_drills-knockout.gif')}
                alt={"Alternate Text "} style={{borderRadius: 15, borderColor: '#fff', borderWidth: 1}} />
            </VStack>
          )
        }
        else {
          return (
            <View style={styles.containerYouTube}>
              <YoutubePlayer
                height={210}
                videoId={'lpZxuEKnaWw'}
              />
            </View>
          )
        }
      }
      else if (drillOption === 5) {
        if (Platform.OS === 'ios') {
          return (
            <VStack justifyContent="center" alignItems="center" mb={6} mt={5} >
                <Image key={"fourgoal"} size={"2xl"} resizeMode="cover"
                source={require('../../assets/soccer_drills-4_goal_shoot.gif')}
                alt={"Alternate Text "} style={{borderRadius: 15, borderColor: '#fff', borderWidth: 1}} />
            </VStack>
          )
        }
        else {
          return (
            <View style={styles.containerYouTube}>
              <YoutubePlayer
                height={210}
                videoId={'le16DasYkbg'}
              />
            </View>
          )
        }
      }
      else if (drillOption === 6) {
        if (Platform.OS === 'ios') {
          return (
            <VStack justifyContent="center" alignItems="center" mb={6} mt={5} >
                <Image key={"freeze"} size={"2xl"} resizeMode="cover"
                source={require('../../assets/soccer_drill-freeze_tag.gif')}
                alt={"Alternate Text "} style={{borderRadius: 15, borderColor: '#fff', borderWidth: 1}} />
            </VStack>
          )
        }
        else {
          return (
            <View style={styles.containerYouTube}>
              <YoutubePlayer
                height={210}
                videoId={'VE8TdSymbIc'}
              />
            </View>
          )
        }
      }
    }

    const drillInstrucText = () => {
      if (drillOption === 0) {
        return (
          <Box style={{backgroundColor: 'rgba(232,121,249,0.2)', borderRadius: 15, paddingTop: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 40}}>
          {displayAnimation()}
            <VStack maxW="100%">
                <Text style={styles.instrucSubHeading}>
                  Setup:
                </Text>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Each player starts with a ball
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Cone off a square area (20x20 yards)
                    </Text>
                  </HStack>
                  <Text style={styles.instrucSubHeading}>
                    Green Light:
                  </Text>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Coach calls out “Green Light.”
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Players dribble around the area in any direction they choose.
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Players must:
                    </Text>
                  </HStack>
                  <HStack ml="10">
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Adjust their direction when encountering other players.
                    </Text>
                  </HStack>
                  <HStack ml="10">
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Make turns to avoid running into the edge of the field.
                    </Text>
                  </HStack>
                  <Text style={styles.instrucSubHeading}>
                    Red Light:
                  </Text>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Coach calls out “Red Light.”
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Players must stop their ball as quickly as possible.
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      This improves:
                    </Text>
                  </HStack>
                  <HStack ml="10">
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      <Text style={{fontWeight: '800', color: '#E879F9'}}>Reaction time:</Text> Responding quickly to the command.
                    </Text>
                  </HStack>
                  <HStack ml="10">
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      <Text style={{fontWeight: '800', color: '#E879F9'}}>Footwork dexterity:</Text> Controlling the ball with quick stops.
                    </Text>
                  </HStack>
                  <Text style={styles.instrucSubHeading}>
                    Advanced:
                  </Text>
                  {proUpgrade(0)}
                    <Text style={styles.instrucSubHeading}>
                      Benefits:
                    </Text>
                    <HStack>
                      <Text style={styles.instrucDot}>{`\u2022`}</Text>
                      <Text style={styles.instrucText}>
                        Kids enjoy the drill because it focuses on improving individual skills within a play-game environment.
                      </Text>
                      </HStack>
                </VStack>
              </Box>
        )
      }
      else if (drillOption === 1) {
        return (
          <Box style={{backgroundColor: 'rgba(232,121,249,0.2)', borderRadius: 15, paddingTop: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 40}}>
            {displayAnimation()}
            <VStack maxW="100%">
                <Text style={styles.instrucSubHeading}>
                  Setup:
                </Text>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Place each child facing each other 5-7 yards apart
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Set up two domes to create a "gate" in between the players.
                    </Text>
                  </HStack>
                  <Text style={styles.instrucSubHeading}>
                    Objective:
                  </Text>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Players aim to pass the ball through the two domes without hitting them.
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      If a player successfully passes the ball through the domes two times, move the domes closer together.
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      The goal is to see how close players can get to the domes and still make successful passes.
                    </Text>
                  </HStack>
                  <Text style={styles.instrucSubHeading}>
                    Coaching Points:
                  </Text>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Plant foot:
                    </Text>
                  </HStack>
                  <HStack ml="10">
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Position the plant foot next to the ball.
                    </Text>
                  </HStack>
                  <HStack ml="10">
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Ensure the toe of the plant foot points in the direction of the intended pass.
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Foot technique:
                    </Text>
                  </HStack>
                  <HStack ml="10">
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Instruct players to use the <Text style={{fontWeight: '800', color: '#E879F9'}}>inside of their foot </Text>for a controlled pass.
                    </Text>
                  </HStack>
                  <Text style={styles.instrucSubHeading}>
                    Advanced:
                  </Text>
                  {proUpgrade(1)}
                  <Text style={styles.instrucSubHeading}>
                    Focus:
                  </Text>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      This drill is designed to improve passing accuracy.
                    </Text>
                    </HStack>
                    <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Repetition will help players refine their passing technique and improve accuracy over time.
                    </Text>
                    </HStack>
                </VStack>
              </Box>
        )
      }
      else if (drillOption === 2) {
        return (
          <Box style={{backgroundColor: 'rgba(232,121,249,0.2)', borderRadius: 15, paddingTop: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 40}}>
            {displayAnimation()}
            <VStack maxW="100%">
                <Text style={styles.instrucSubHeading}>
                  Setup:
                </Text>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      The coach sets up two cones, with a line of kids behind each cone.
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      The coach stays in the middle with 10 soccer balls (or as many as you have).
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      A mini goal is set up at the opposite end of the coach.
                    </Text>
                  </HStack>
                  <Text style={styles.instrucSubHeading}>
                    Drill Process:
                  </Text>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      The coach rolls the ball toward the mini goal and shouts for the players to go get the ball.
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      The first player from each line sprints toward the ball.
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      The player who reaches the ball first becomes the attacker.
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      The other player must drop back to protect the goal.
                    </Text>
                  </HStack>
                  <Text style={styles.instrucSubHeading}>
                    Coaching Points on Defending:
                  </Text>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      When defending 1v1, players should keep their legs in a "staggered" or "split" stance.
                    </Text>
                  </HStack>
                  <HStack ml="10">
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      "Staggered" or "Split" stance:  where one leg is slightly forward and the other slightly back
                    </Text>
                  </HStack>
                  <HStack ml="10">
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      This stance offers improved balance and stability compared to standing with both feet side-by-side
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Keep the attacker in front of you and away from your goal.
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Do not "dive-in" to challenge the attacker.
                    </Text>
                  </HStack>
                  <HStack ml="10">
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Dive-in: A defender attempts to tackle the attacking player by making a quick step forward, but this often allows the attacker to take the ball around the defender. (See the animation at the top of the screen for an example.)
                    </Text>
                  </HStack>
                  <Text style={styles.instrucSubHeading}>
                    Advanced:
                  </Text>
                  {proUpgrade(2)}
                  <Text style={styles.instrucSubHeading}>
                    Purpose:
                  </Text>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      This drill is fun and replicates real-game 1v1 situations that players might face.
                    </Text>
                    </HStack>
                </VStack>
              </Box>
        )
      }
      else if (drillOption === 3) {
        return (
          <Box style={{backgroundColor: 'rgba(232,121,249,0.2)', borderRadius: 15, paddingTop: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 40}}>
            {displayAnimation()}
            <VStack maxW="100%">
                <Text style={styles.instrucSubHeading}>
                  Setup:
                </Text>
                <HStack>
                  <Text style={styles.instrucDot}>{`\u2022`}</Text>
                  <Text style={styles.instrucText}>
                    Using domes, create a miniature rectangular soccer field.
                  </Text>
                </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      One or two players are designated as sharks and placed in the middle of the field.
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      The rest of the players are minnows, each with a ball at their feet.
                    </Text>
                  </HStack>
                  <Text style={styles.instrucSubHeading}>
                    Objective:
                  </Text>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Minnows try to dribble to the other side of the field without losing possession.
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Sharks try to take the ball from the minnows.
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      If a shark steals the ball, the minnow becomes a shark.
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      The game ends when the last minnow becomes a shark.
                    </Text>
                  </HStack>
                  <Text style={styles.instrucSubHeading}>
                    Coaching Points:
                  </Text>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      encourage players to <Text style={{fontWeight: '800', color: '#E879F9'}}>move to open space</Text> to avoid pressure.
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      encourage <Text style={{fontWeight: '800', color: '#E879F9'}}>changes of direction</Text> to maintain possession of the ball.
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Work on shielding the ball and bursting into space when possible.
                    </Text>
                    </HStack>
                    <HStack ml="10">
                      <Text style={styles.instrucDot}>{`\u2022`}</Text>
                      <Text style={styles.instrucText}>
                        <Text style={{fontWeight: '800', color: '#E879F9'}}>Shielding the ball:</Text> the technique where a player uses their body to protect the ball from an opponent. The player keeps their body positioned between the ball and the defender
                      </Text>
                    </HStack>
                    <HStack ml="10">
                      <Text style={styles.instrucDot}>{`\u2022`}</Text>
                      <Text style={styles.instrucText}>
                        <Text style={{fontWeight: '800', color: '#E879F9'}}>Bursting into space:</Text> The action of a player quickly accelerating into an open area of the field, either by dribbling or with a short pass for him/herself to run onto.
                      </Text>
                    </HStack>
                  <Text style={styles.instrucSubHeading}>
                    Advanced:
                  </Text>
                  {proUpgrade(3)}
                  <Text style={styles.instrucSubHeading}>
                    Purpose of Drill:
                  </Text>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Helps kids work on dribbling away from pressure.
                    </Text>
                    </HStack>
                    <HStack>
                      <Text style={styles.instrucDot}>{`\u2022`}</Text>
                      <Text style={styles.instrucText}>
                        Encourages players to use their bodies to block defenders.
                      </Text>
                      </HStack>
                </VStack>
              </Box>
        )
      }
      else if (drillOption === 4) {
        return (
          <Box style={{backgroundColor: 'rgba(232,121,249,0.2)', borderRadius: 15, paddingTop: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 40}}>
            {displayAnimation()}
            <VStack maxW="100%">
                <Text style={styles.instrucSubHeading}>
                  Setup:
                </Text>
                <HStack>
                  <Text style={styles.instrucDot}>{`\u2022`}</Text>
                  <Text style={styles.instrucText}>
                    Use domes to create a 20x20 yard square playing area.
                  </Text>
                </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Players dribble inside the area.
                    </Text>
                  </HStack>
                  <Text style={styles.instrucSubHeading}>
                    Objective:
                  </Text>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      When the coach yells “knockout,” players attempt to knock other players' balls out of the area.
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Players must keep their own ball inside the area.
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      If a player's ball is knocked out, they must perform 10 "toe touches" before re-entering the grid.
                    </Text>
                  </HStack>
                  <HStack ml="10">
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Toe touches: player gently taps the top of the ball with the toes of each foot while alternating quickly between the left and right feet
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      When the coach yells “Dribble” players go back to dribbling the ball in the area.
                    </Text>
                  </HStack>
                  <Text style={styles.instrucSubHeading}>
                    Coaching Points:
                  </Text>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      <Text style={{fontWeight: '800', color: '#E879F9'}}>Shield the ball</Text> using your body to protect it from defenders.
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Keep your <Text style={{fontWeight: '800', color: '#E879F9'}}>eyes up</Text> and <Text style={{fontWeight: '800', color: '#E879F9'}}>scan</Text> the area to stay aware of other players.
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      <Text style={{fontWeight: '800', color: '#E879F9'}}>Keep moving</Text> to stay active and avoid being easily knocked out.
                    </Text>
                  </HStack>
                  <Text style={styles.instrucSubHeading}>
                    Advanced:
                  </Text>
                  {proUpgrade(4)}
                  <Text style={styles.instrucSubHeading}>
                    Purpose of Drill:
                  </Text>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      <Text style={{fontWeight: '800', color: '#E879F9'}}>Enhance shielding skills:</Text> Players learn to protect the ball from defenders by using their bodies effectively.
                    </Text>
                    </HStack>
                    <HStack>
                      <Text style={styles.instrucDot}>{`\u2022`}</Text>
                      <Text style={styles.instrucText}>
                        <Text style={{fontWeight: '800', color: '#E879F9'}}>Develop decision-making:</Text> Players need to scan the field and decide when to move, shield, or knock out an opponent’s ball while keeping theirs in the grid.
                      </Text>
                      </HStack>
                      <HStack>
                        <Text style={styles.instrucDot}>{`\u2022`}</Text>
                        <Text style={styles.instrucText}>
                          <Text style={{fontWeight: '800', color: '#E879F9'}}>Increase agility and awareness:</Text> Players must stay active, keep their heads up, and react quickly to other players' movements.
                        </Text>
                        </HStack>
                </VStack>
              </Box>
        )
      }
      else if (drillOption === 5) {
        return (
          <Box style={{backgroundColor: 'rgba(232,121,249,0.2)', borderRadius: 15, paddingTop: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 40}}>
            {displayAnimation()}
            <VStack maxW="100%">
                <Text style={styles.instrucSubHeading}>
                  Setup:
                </Text>
                <HStack>
                  <Text style={styles.instrucDot}>{`\u2022`}</Text>
                  <Text style={styles.instrucText}>
                    Set up 4 small goals: 2 on each end of a 20x20 yard area.
                  </Text>
                </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Divide players into 2 lines on the sideline of the area.
                    </Text>
                  </HStack>
                  <Text style={styles.instrucSubHeading}>
                    Objective:
                  </Text>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      The coach serves a ball onto the field.
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      The first player from each line runs to get the ball.
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      The player who gets the ball can shoot on any of the 4 goals.
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      The other player becomes the defender.
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      After the shot, the coach serves another ball and the next two players from each line go.
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      The played who took the shoot collects the ball and returns to coach.
                    </Text>
                  </HStack>
                  <Text style={styles.instrucSubHeading}>
                    Coaching Points:
                  </Text>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      <Text style={{fontWeight: '800', color: '#E879F9'}}>Take a good first touch</Text> to control the ball before shooting.
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      <Text style={{fontWeight: '800', color: '#E879F9'}}>Be decisive</Text> when entering shooting range to ensure a quick and effective shot.
                    </Text>
                  </HStack>
                  <Text style={styles.instrucSubHeading}>
                    Advanced:
                  </Text>
                  {proUpgrade(5)}
                  <Text style={styles.instrucSubHeading}>
                    Purpose of Drill:
                  </Text>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      This drill improves a player's shooting accuracy from both long distances and close in.
                    </Text>
                    </HStack>
                    <HStack>
                      <Text style={styles.instrucDot}>{`\u2022`}</Text>
                      <Text style={styles.instrucText}>
                        This drill improves a player's ablity to scramble into a defencive position.
                      </Text>
                      </HStack>
                      <HStack>
                        <Text style={styles.instrucDot}>{`\u2022`}</Text>
                        <Text style={styles.instrucText}>
                          This drill improves a player's ability to attack a goal
                        </Text>
                        </HStack>
                </VStack>
              </Box>
        )
      }
      else if (drillOption === 6) {
        return (
          <Box style={{backgroundColor: 'rgba(232,121,249,0.2)', borderRadius: 15, paddingTop: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 40}}>
            {displayAnimation()}
            <VStack maxW="100%">
                <Text style={styles.instrucSubHeading}>
                  Setup:
                </Text>
                <HStack>
                  <Text style={styles.instrucDot}>{`\u2022`}</Text>
                  <Text style={styles.instrucText}>
                    Set up a rectangular or square area with cones to create boundaries. A good starting size is about 20x20 yards for younger players.
                  </Text>
                </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                       Have all players (except the coach) dribble a ball inside the area.
                    </Text>
                  </HStack>
                  <Text style={styles.instrucSubHeading}>
                    Objective:
                  </Text>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Players dribble around the soccer field while a coach tries to tag them.
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      If they get tagged, they place their foot on top of the ball and stay "frozen"
                    </Text>
                  </HStack>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Once frozen, a teammate can unfreeze them by dribbling over and giving a high five.
                    </Text>
                  </HStack>
                  <Text style={styles.instrucSubHeading}>
                    Coaching Points:
                  </Text>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      As the coach, focus on freezing the more advanced players, allowing the less skilled players to develop their dribbling by un-tagging the others.
                    </Text>
                  </HStack>
                  <Text style={styles.instrucSubHeading}>
                    Advanced:
                  </Text>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      <Text style={{fontWeight: '800', color: '#E879F9'}}>Safe zones:</Text> Create “safe zones” where players can temporarily rest but only for a short time (e.g., 5 seconds). They must then re-enter the action.
                    </Text>
                  </HStack>
                  <HStack>
                      <Text style={styles.instrucDot}>{`\u2022`}</Text>
                      <Text style={styles.instrucText}>
                        <Text style={{fontWeight: '800', color: '#E879F9'}}>Challenging the freeze:</Text> Instead of simply giving a high five to unfreeze a teammate, players must complete a task (e.g., a certain number of toe touches or a quick dribble around a cone) before they can unfreeze someone.
                      </Text>
                    </HStack>
                    <HStack>
                        <Text style={styles.instrucDot}>{`\u2022`}</Text>
                        <Text style={styles.instrucText}>
                          <Text style={{fontWeight: '800', color: '#E879F9'}}>Penalty for getting tagged:</Text> When a player gets tagged, they can perform a skill challenge (e.g., 10 toe touches or a quick dribbling course) before re-entering the game.
                        </Text>
                      </HStack>
                      <HStack>
                        <Text style={styles.instrucDot}>{`\u2022`}</Text>
                        <Text style={styles.instrucText}>
                          <Text style={{fontWeight: '800', color: '#E879F9'}}>Scoring system:</Text>  Reward players with points for successful dribbles, unfreezing teammates, or completing challenges. Ask the players to track their points to determine the winner.
                        </Text>
                      </HStack>
                  <Text style={styles.instrucSubHeading}>
                    Purpose of Drill:
                  </Text>
                  <HStack>
                    <Text style={styles.instrucDot}>{`\u2022`}</Text>
                    <Text style={styles.instrucText}>
                      Players work on controlling the ball while moving, improving their ability to dribble under pressure and change direction quickly.
                    </Text>
                    </HStack>
                    <HStack>
                      <Text style={styles.instrucDot}>{`\u2022`}</Text>
                      <Text style={styles.instrucText}>
                        Players must react quickly to avoid being tagged by coaches, improving their speed, agility, and ability to stop or change direction rapidly.
                      </Text>
                      </HStack>
                      <HStack>
                        <Text style={styles.instrucDot}>{`\u2022`}</Text>
                        <Text style={styles.instrucText}>
                          The unfreezing mechanic (high-fiving teammates to unfreeze them) encourages players to work together, fostering teamwork and communication.
                        </Text>
                        </HStack>
                </VStack>
              </Box>
        )
      }
      else {
        return (
          <Text style={{color: '#fff'}}>ERROR! Click Back and try another drill</Text>
        )
      }
    }

    const backDrills = () => {

      navigate('DrillsHome');

    }

        return (
          <Center>
            <LinearGradient colors={['#000', '#000']} style={styles.linearGradientBg}>
              <Container maxW="100%" pl="2.5" mr="2.5">
              {drillHeading()}
              <ScrollView>

                {drillInstrucText()}


                  </ScrollView>
                  <HStack alignItems="center" safeAreaBottom p="0" mt="3" shadow={6} >
                    <Button minW="100%" bg="#E879F9" size="md" _text={{fontSize: "xl", color: '#fff'}} variant="subtle" onPress={() => backDrills()}>Back to Drills</Button>
                  </HStack>
                </Container>
              </LinearGradient>
        </Center>
        )
    }


const styles = StyleSheet.create({


  linearGradientBg: {
    minWidth: '100%',
  },
  instrucSubHeading: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 20,
    lineHeight: 20,
    marginTop: 15,
    marginBottom: 5,
  },
  instrucText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
    paddingRight: 5,
  },
  instrucTextPink: {
    color: '#ccc',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
    paddingRight: 5,
  },
  instrucDot: {
    fontSize: 26,
    lineHeight: 26,
    color: '#fff',
    paddingRight: 5,
    top: 2.5
  },
  containerYouTube: {
    //flex: 1,
    //backgroundColor: 'darkblue',
    paddingTop: 15
  },


})

export default DrillsInstructions;
