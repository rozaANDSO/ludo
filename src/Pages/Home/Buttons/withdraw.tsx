import {
    Button,
    FormControl,
    FormLabel,
    Image,
    MenuItem,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,

    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { SocketContext } from "../../Context/socketContext";

import { useNavigate } from "react-router-dom";

import src from "../../../assets/icons/ma.jpg";
const Withdraw = () => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const { socket } = useContext(SocketContext);
    const [amount, setAmount] = useState(0);
    const [account, setAccount] = useState("");

    const onAccountChange = (e: any) => {
        setAccount(e.target.value);
    };
    // const [select, setSelect] = useState("");
    // const selectChange = (e: any) => {
    //     setSelect(e.target.value);
    // };
    const onAmountChange = (e: any) => {
        setAmount(e.target.value);
    };
    const toast = useToast();
    const withdrawMoney = () => {
        return
        setLoading(true);
        socket.emit("transactions", amount, account, (res: any) => {
            setLoading(false);
            if (res.code == 200) {
                toast({
                    title: "Success",
                    description: res.description,
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                });
                navigate("/transactions");
            } else if (res.code == 400) {
                toast({
                    title: "Error",
                    description: res.description,
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Error",
                    description: "internal server error",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                });
            }
        });
    };

    return (
        <>
            <MenuItem onClick={onOpen}>
                {" "}
                <Image src={src} height="25px" width="25px" marginRight="5px" />
                ወጪ
            </MenuItem>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody paddingTop="50px">

                        <FormControl>
                            <FormLabel>Amount</FormLabel>
                            <NumberInput isRequired value={amount}>
                                <NumberInputField onChange={onAmountChange} />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Account</FormLabel>
                            <NumberInput isRequired value={account}>
                                <NumberInputField onChange={onAccountChange} />
                            </NumberInput>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter justifyContent="center">
                        <Button colorScheme="red" mr={3} onClick={() => {
                            onClose()
                            setLoading(false)
                        }}>
                            Cancel
                        </Button>
                        <Button isLoading={loading} colorScheme="green" onClick={withdrawMoney}>
                            Withdraw
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
export default Withdraw;