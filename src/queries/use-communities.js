import { useQuery } from "@tanstack/react-query";
import { getCommunities } from "../services/community-service.js";

export const useCommunities = (filters) => {
  return useQuery(
    {
      queryKey: ['Communities', filters],
      queryFn: () => getCommunities(filters)
    }
  )
}