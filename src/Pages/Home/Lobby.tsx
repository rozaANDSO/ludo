// import { Flex, Text, Center, useStatStyles } from "@chakra-ui/react";
// import {
//   ModalContent,
//   ModalFooter,
//   Button,
//   ModalBody,
//   Modal,
//   ModalOverlay,
//   useDisclosure,
// } from "@chakra-ui/react";
import {
  ModalContent,
  ModalFooter,
  Button,
  ModalBody,
  Modal,
  ModalOverlay,
  useDisclosure,
  Text,
  Center,
  FormControl,
  FormLabel,
  Flex,
  Input,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { SocketContext } from "../Context/socketContext";
import { useNavigate } from "react-router-dom";
import { Lobby, LobbyEmit } from "../../utils/types";

type Props = {
  lobby: Lobby;
};
export const LobbyInfo = ({ lobby }: Props) => {
  const { user, setUser } = useContext(SocketContext);
  const navigate = useNavigate();
  const [password, setPassword] = useState<String>("");
  const passwordChange = (e: any) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };
  const { socket } = useContext(SocketContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const joinLobby = () => {

    socket.emit("join", lobby.lobbyId, password, (response: LobbyEmit) => {
      if (response.code == 200) {
        const cloneUser = { ...user };
        if (!user) {
          return
        }
        cloneUser.credit = user?.credit - response.lobby.amount;
        setUser(cloneUser)
        navigate(`/game/${response.lobby.lobbyId}`, { state: { lobby: response.lobby } });
      }
    });
  };
  return (
    <>
      <Flex
        borderRadius="md"
        w="80%"
        maxW="md"
        minW="275px"
        paddingX="20px"
        paddingY="10px"
        onClick={onOpen}
        bgColor="#049645"
        color="white"
        flexDirection="column"
        _hover={{
          transitionDuration: "0.2s",
          transitionTimingFunction: " ease-in-out",
          background: "#dce712",
          color: "black",
        }}
      >
        <Text as="kbd" fontSize="l">
          Owner:{lobby.owner}
        </Text>
        <Text as="kbd" fontSize="l">
          Players: {lobby.players.length}
        </Text>
        {lobby.password && (
          <Text as="kbd" fontSize="l">
            Password protected
          </Text>
        )}

        <Text as="kbd" fontSize="l">
          Prize: {lobby.amount}
        </Text>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody paddingTop="50px">
            <Center>
              <Text fontSize="xl" as="b">
                Join Lobby?
              </Text>
            </Center>
            <Center>
              {lobby.password && (
                <>
                  <FormControl marginY="15px">
                    <FormLabel>Password:</FormLabel>
                    <Input
                      onChange={passwordChange}
                      //@ts-ignore
                      value={password}
                      placeholder="**********"
                      type="text"
                      variant="filled"
                      mb={1}
                    />
                  </FormControl>
                </>
              )}
            </Center>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={joinLobby}>
              Join
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
