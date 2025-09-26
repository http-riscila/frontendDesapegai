import { useQuery } from "@tanstack/react-query";

import { countAvailableItems } from "../services/item-service.js";
import { countCreatedCommunities } from "../services/community-service.js";
import { countAcceptedProposals } from "../services/proposal-service.js";

import { getCommunitiesByUser } from "../services/community-service.js";
import { getItemsByUser } from "../services/item-service.js";
import {
  getProposalsByRecipient,
  getProposalsBySender,
} from "../services/proposal-service.js";

export function useProfileCounts(userId) {
  const availableItems = useQuery({
    queryKey: ["AvailableItemsCount", userId],
    queryFn: () => countAvailableItems(userId),
    initialData: 0,
  });

  const createdCommunities = useQuery({
    queryKey: ["CreatedCommunitiesCount", userId],
    queryFn: () => countCreatedCommunities(userId),
    initialData: 0,
  });

  const acceptedProposals = useQuery({
    queryKey: ["AcceptedProposalsCount", userId],
    queryFn: () => countAcceptedProposals(userId),
    initialData: 0,
  });

  return {
    availableItems: availableItems.data,
    createdCommunities: createdCommunities.data,
    acceptedProposals: acceptedProposals.data,
  };
}

export const useCommunitiesByUser = (userId) => {
  const { data = [] } = useQuery({
    queryKey: ["CommunitiesByUser", userId],
    queryFn: () => getCommunitiesByUser(userId),
    initialData: [],
  });
  return data;
};

export const useItemsByUser = (userId) => {
  const itemsByUser = useQuery({
    queryKey: ["ItemsByUser", userId],
    queryFn: () => getItemsByUser(userId),
    initialData: [],
  });
  return itemsByUser.data;
};

export const useProposalsByRecipient = (userId) => {
  const proposalsByRecipient = useQuery({
    queryKey: ["ProposalsByRecipient", userId],
    queryFn: () => getProposalsByRecipient(userId),
    initialData: [],
  });
  return proposalsByRecipient.data;
};

export const useProposalsBySender = (userId) => {
  const proposalsBySender = useQuery({
    queryKey: ["ProposalsBySender", userId],
    queryFn: () => getProposalsBySender(userId),
    initialData: [],
  });
  return proposalsBySender.data;
};
