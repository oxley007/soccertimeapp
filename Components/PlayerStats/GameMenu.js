import React from 'react';
import { HStack, VStack, Box, Center, Button, Text } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';


function GameMenu({ games, currentUser, exitGameFlag, getLeftMenuOptionDisplay, goToEvents, gameOptionsFunc, gameOptionsFuncOpen, trophyIcon, cogIcon, styles }) {
  if (!games?.[0]) {
    // If no game data, render nothing or a placeholder
    return null;
  }

  const isSetupByCurrentUser = games[0].gameSetupProfile === currentUser?.uid;

  return (
    <>
      {isSetupByCurrentUser ? (
        <HStack style={{ backgroundColor: '#000' }}>
          <VStack minW="33.3%" maxW="33.3%">
            {getLeftMenuOptionDisplay()}
          </VStack>

          <VStack minW="33.3%" maxW="33.3%">
            <Box bg="tertiary.100" style={{ zIndex: 3, elevation: 3, minHeight: 150 }}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#222', '#222']}
                style={styles.linearGradientLive}
              >
                <Button variant="unstyled" onPress={goToEvents}>
                  <HStack>
                    <Center>
                      {trophyIcon}
                      <Text style={styles.textLiveScore}>Live Scores</Text>
                    </Center>
                  </HStack>
                </Button>
              </LinearGradient>
            </Box>
          </VStack>

          <VStack minW="33.3%" maxW="33.3%">
            <Box bg="#000" style={{ zIndex: 3, elevation: 3, minHeight: 150 }}>
              <Button
                variant="unstyled"
                onPress={exitGameFlag ? gameOptionsFuncOpen : gameOptionsFunc}
              >
                <HStack>
                  <Center pl="2">
                    {cogIcon}
                    <Text style={styles.textBottomMenu}>Options</Text>
                  </Center>
                </HStack>
              </Button>
            </Box>
          </VStack>
        </HStack>
      ) : (
        <HStack style={{ backgroundColor: '#000' }}>
          <VStack minW="50%" maxW="50%">
            {getLeftMenuOptionDisplay()}
          </VStack>

          <VStack minW="50%" maxW="50%">
            <Box bg="#000" style={{ zIndex: 3, elevation: 3, minHeight: 150 }}>
              <Button
                variant="unstyled"
                onPress={exitGameFlag ? gameOptionsFuncOpen : gameOptionsFunc}
              >
                <HStack>
                  <Center pl="2">
                    {cogIcon}
                    <Text style={styles.textBottomMenu}>Game Options</Text>
                  </Center>
                </HStack>
              </Button>
            </Box>
          </VStack>
        </HStack>
      )}
    </>
  );
}

export default GameMenu;
