import { useContext, useState } from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";
import { LocationContext } from "../../../services/location/location.context";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
  padding-bottom: 0;
`;

export const Search = ({ isFavoritesToggled, onFavoritesToggle }) => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  return (
    <View>
      <SearchContainer>
        <Searchbar
          icon={isFavoritesToggled ? "heart" : "heart-outline"}
          onIconPress={onFavoritesToggle}
          placeholder="Search for a location"
          onSubmitEditing={() => {
            search(searchKeyword);
          }}
          onChangeText={(text) => {
            setSearchKeyword(text);
          }}
          value={searchKeyword}
        />
      </SearchContainer>
    </View>
  );
};
