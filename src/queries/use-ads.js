import { getItemsByCommunity } from "../services/item-service.js";
import { useQuery } from "@tanstack/react-query";

export const useAds = (communityId) => {
  return useQuery(
    {
      queryKey: ['Ads', communityId],
      queryFn: () => getItemsByCommunity(communityId)
    }
  )
}