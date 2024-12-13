import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

type Props = {
  searchLobbies: any;
  search: String;
  searchChange: any;
};
export const SearchBar = ({ searchLobbies, search, searchChange }: Props) => {
  return (
    <>
      <InputGroup borderRadius={5} size="sm">
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="gray.600" />}
        />
        <Input
          //@ts-ignore
          value={search}
          onChange={searchChange}
          type="text"
          placeholder="Search Lobbies"
        />
        <InputRightAddon p={0} border="none">
          <Button
            colorScheme="blue"
            size="sm"
            borderLeftRadius={0}
            borderRightRadius={3.3}
            onClick={searchLobbies}
          >
            Search
          </Button>
        </InputRightAddon>
      </InputGroup>
    </>
  );
};
