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

} from "@chakra-ui/react";
import { useState } from "react";
// import { SocketContext } from "../../Context/socketContext";
// import { AckEvent } from "../../../utils/types/socketEvents";
import src from "../../../assets/icons/depo.jpg";
const Deposit = () => {
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    //  const { socket } = useContext(SocketContext);
    const onAmountChange = (e: any) => {
        setAmount(e.target.value);
    };
    // const toast = useToast();
    const depositMoney = () => {
        setLoading(true);

    };
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <MenuItem onClick={onOpen}>
                <Image src={src} height="25px" width="25px" marginRight="5px" />
                ተቀማጭ
            </MenuItem>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody paddingTop="50px">
                        <FormControl>
                            <FormLabel>Amount</FormLabel>
                            <NumberInput min={1} value={amount}>
                                <NumberInputField onChange={onAmountChange} />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter justifyContent="center">
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            isLoading={loading}
                            colorScheme="green"
                            onClick={depositMoney}
                        >
                            Deposit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
export default Deposit;