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
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputStepper,
  Flex,
  Input,
  Switch,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { SocketContext } from "../Context/socketContext";
import { useNavigate } from "react-router-dom";


export const CreateLobby = () => {
  const { user, setUser } = useContext(SocketContext);
  const [amount, setAmount] = useState(10);
  const [password, setPassword] = useState<String>("");
  const [show, setShow] = useState(false);
  const passwordChange = (e: any) => {

    setPassword(e.target.value);
  };
  const amountChange = (e: any) => {
    setAmount(e.target.value);
  };
  const showChange = (e: any) => {
    setShow(e.target.checked);
  };
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const createLobby = () => {
    socket.emit("create", amount, password, (response: any) => {
      if (response.code == 200) {
        const cloneUser = { ...user };
        if (!user) {
          return
        }
        cloneUser.credit = user?.credit - amount;
        setUser(cloneUser)
        navigate(`/game/${response.lobby.lobbyId}`, { state: { lobby: response.lobby } });
      }
    });
  };
  return (
    <>
      <Button colorScheme="yellow" onClick={onOpen} w="60%">
        Create Lobby
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody paddingTop="50px">
            <Flex flexDir="column" gap="15px">
              <Center>
                <Text fontSize="xl" as="b">
                  New Lobby
                </Text>
              </Center>
              <Center>
                <FormControl>
                  <FormLabel>Amount</FormLabel>
                  <NumberInput max={50} min={10}>
                    <NumberInputField onChange={amountChange} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>{" "}
              </Center>
              <Center>
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="email-alerts" mb="0">
                    add password?
                  </FormLabel>
                  <Switch onChange={showChange} id="email-alerts" />
                </FormControl>
              </Center>

              <Center>
                {show && (
                  <FormControl>
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
                )}
              </Center>
            </Flex>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={createLobby}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
