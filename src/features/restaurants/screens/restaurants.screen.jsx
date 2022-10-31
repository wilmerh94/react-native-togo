import { useContext, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { LocationContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { RestaurantList } from "../components/restaurant-list.styles";
import { RestaurantsInfoCard } from "../components/restaurants-info-card.components";

import { Search } from "../components/search.component";

export const RestaurantsScreen = ({ navigation }) => {
  const { isLoading, restaurants, error } = useContext(RestaurantsContext);
  const { error: locationError } = useContext(LocationContext);
  const [isToggled, setIsToggled] = useState(false);
  const hasError = !!error || !!locationError;
  return (
    <SafeArea>
      <Spacer position="bottom" size="large">
        <Search
          isFavoritesToggled={isToggled}
          onFavoritesToggle={() => setIsToggled(!isToggled)}
        />
      </Spacer>

      {!hasError && (
        <RestaurantList
          data={restaurants}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity>
                <Spacer position="bottom" size="large">
                  <RestaurantsInfoCard restaurant={item} />
                </Spacer>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.name}
        />
      )}
    </SafeArea>
  );
};
