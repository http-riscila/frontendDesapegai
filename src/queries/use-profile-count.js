import { useQuery } from "@tanstack/react-query";
import { countAvailableItems } from "../services/item-service.js";
import { countCreatedCommunities } from "../services/community-service.js";
import { countAcceptedProposals } from "../services/proposal-service.js";

export function useProfileCounts(userId) {
  const availableItems = useQuery({
    queryKey: ["AvailableItemsCount", userId],
    queryFn: () => countAvailableItems(userId),
  });

  const createdCommunities = useQuery({
    queryKey: ["CreatedCommunitiesCount", userId],
    queryFn: () => countCreatedCommunities(userId),
  });

  const acceptedProposals = useQuery({
    queryKey: ["AcceptedProposalsCount", userId],
    queryFn: () => countAcceptedProposals(userId),
  });

  return {
    availableItems: availableItems.data,
    createdCommunities: createdCommunities.data,
    acceptedProposals: acceptedProposals.data,
  };
}
