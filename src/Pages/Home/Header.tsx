import { Button, Flex, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Spinner, useDisclosure } from "@chakra-ui/react";
import {
  ModalContent,
  ModalFooter,
  ModalBody,
  Modal,
  ModalOverlay,
  Text,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../Context/socketContext";
import { useContext } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Feedback from "./Buttons/fb";
export const Header = () => {

  const { user } = useContext(SocketContext);
  // console.log(user)
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const signOut = () => {

    localStorage.clear();
    navigate("/signin");
  };
  return (
    <>
      <Flex
        paddingY="10px"
        justifyContent={"space-between"}
        alignItems="center"
        flexGrow={"1"}
        maxW="md"
        color="white"
        marginX="15px"
      >
        <Image
          boxSize="55px"
          width="fit-content"
          objectFit="cover"
          src="https://cdn.pixabay.com/photo/2017/08/23/10/46/cube-2672325_1280.png"
          alt="Dice icon"
        />
        <Flex gap="7px" alignItems="center">
          {!user && <Spinner />}
          {user && <Flex

            justifyContent="center"
            alignItems="center"
            color="#fff"
            fontSize={["sm"]}
            gap="9px"
          >
            <Feedback />
            <Flex flexDir="column"
              justifyContent="center"
              alignItems="center"
              color="#fff"
              fontSize={["sm"]} ><Text height="max-content" as="b">
                {user.credit} ብር
              </Text>

              <Text height="max-content" as="b">
                @{user.username}
              </Text></Flex>

          </Flex>}
          {user && <Menu >
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList gap="5px" color="black
            ">
              {/* <Deposit />
              <Withdraw />
              <PastGames />
              <PastBets /> */}

              <MenuItem >
                {/* <Link to="/transactions">
                  <Flex>
                    <Image
                      // src={src}
                      height="25px"
                      width="25px"
                      marginRight="5px"
                    />
                    የገንዘብ ዝውውር ታሪክ
                  </Flex>
                </Link> */}
              </MenuItem>


              <MenuItem onClick={onOpen}>

                <Image height="25px" width="25px" marginRight="5px" />
                ለመውጣት
              </MenuItem>

            </MenuList>

          </Menu>}

        </Flex>

      </Flex >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody paddingTop="50px">
            <Center>
              <Text fontSize="xl" as="b">
                Sign out?
              </Text>
            </Center>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button colorScheme="green" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={signOut}>
              Sign out
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
