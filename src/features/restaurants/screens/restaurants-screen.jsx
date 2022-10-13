import { useContext } from "react";
import { FlatList, View } from "react-native";
import { ActivityIndicator, Searchbar, MD2Colors } from "react-native-paper";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { RestaurantInfoCard } from "../components/restaurants-info-card.component";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: { padding: 16 },
})``;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled(View)`
  position: absolute;
  top: 50%;
  left: 50%;
`;
export const RestaurantScreen = () => {
  const { restaurants, isLoading, error } = useContext(RestaurantsContext);
  // const [searchQuery, setSearchQuery] = useState("");

  // const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={MD2Colors.blue300} />
        </LoadingContainer>
      )}
      <SearchContainer>
        <Searchbar
        // placeholder="Search"
        // onChangeText={onChangeSearch}
        // value={searchQuery}
        />
      </SearchContainer>
      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => {
          console.log(item);
          return (
            <Spacer variant="bottom" size="large">
              <RestaurantInfoCard restaurants={item} />
            </Spacer>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};
