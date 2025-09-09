import { getAllItems } from "../services/item-service.js";
import { useQuery } from "@tanstack/react-query";
import { getCommunities } from "../services/community-service.js";

export const useHomeCommunities = (search) => {
  return useQuery(
    {
      queryKey: ['HomeCommunities', search],
      queryFn: () =>
        getCommunities({orderBy: 'memberCount', orderDirection: 'desc', limit: 6, search: search}),
    }
  )
}

export const useHomeItems = () => {
  return useQuery(
    {
      queryKey: ['HomeItems'],
      queryFn: () => getAllItems(),
      // pega apenas os 5 primeiros items
      select: (data) => data.slice(0, 5)
    }
  )
}