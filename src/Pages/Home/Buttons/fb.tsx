import {
    Box,
    Button,
    FormControl,
    FormLabel,

    Input,

    Modal,

    ModalContent,

    ModalOverlay,

    Textarea,

    VStack,
    useDisclosure,

} from "@chakra-ui/react";
import { useState } from "react";
// import { SocketContext } from "../../Context/socketContext";

const Feedback = () => {
    const [username, setUsername] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('https://ludomulti.onrender.com/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, message }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit feedback');
            }

            // Clear form fields after successful submission
            setUsername('');
            setMessage('');

            alert('Feedback submitted successfully!');
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Failed to submit feedback. Please try again.');
        }
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button size="sm" onClick={onOpen}>

                አስተያየት
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <Box p={6}>
                        <VStack spacing={6} align="stretch" maxW="md" mx="auto">
                            <FormControl>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Message</FormLabel>
                                <Textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                />
                            </FormControl>
                            <Button colorScheme="blue" onClick={handleSubmit}>Submit Feedback</Button>
                        </VStack>
                    </Box>
                </ModalContent>
            </Modal>
        </>
    );
};
export default Feedback;