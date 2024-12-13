import { Flex } from "@chakra-ui/react";
import { Main } from "./Main";
import { Header } from "./Header";

import { ErrorEvent } from "../components/error";


const Home = () => {
  return (
    <>
      <ErrorEvent />
      <Flex flexDirection={"column"} minH={"100vh"}>
        <Flex backgroundColor={"#3182CE"} justifyContent={"center"}>
          <Header />
        </Flex>

        <Main />

      </Flex>
    </>
  );
};
export default Home;
