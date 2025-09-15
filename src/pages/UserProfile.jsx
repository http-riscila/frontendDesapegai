import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useProfileCounts } from "../queries/use-profile-count";
import { countCreatedCommunities } from "../services/community-service";
import { getCommunitiesByUser } from "../services/community-service";
import { getItemsByUser } from "../services/item-service";
import {
  getProposalsBySender,
  getProposalsByRecipient,
} from "../services/proposal-service";
import Breadcrumb from "../components/Breadcrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileModal from "../components/ProfileModal";
import CommunityCard from "../components/CommunityCard";
import AdCard from "../components/AdCard";
import ProposalCard from "../components/ProposalCard";
import ProductModal from "../components/ProductModal";
import photoBg from "../assets/images/profile-img-bg.png";
import profilePic from "../assets/icons/profile-pic.svg";
import editIcon from "../assets/icons/edit-icon.png";

export default function UserProfile() {
  const { user } = useUser();
  const { availableItems, createdCommunities, acceptedProposals } =
    useProfileCounts(user?.id);

  const [communities, setCommunities] = useState([]);
  const [ads, setAds] = useState([]);
  const [proposalsBySender, setProposalsBySender] = useState([]);
  const [proposalsByRecipient, setProposalsByRecipient] = useState([]);

  const [activeTab, setActiveTab] = useState("my-communities");

  const [selectedAd, setSelectedAd] = useState(null);
  const [showModal, setShowModal] = useState(false);

  /*useEffect(() => {
    if (!user?.id) return;

   async function fetchCounts() {
      try {
        const [trades, items, communities] = await Promise.all([
          countAcceptedProposals(user.id),
          countAvailableItems(user.id),
          countCreatedCommunities(user.id),
        ]);

        setTradeCount(trades);
        setActiveAdCount(items);
        setCommunityCount(communities);
      } catch (error) {
        console.log("Error fetching count data", error);
      }
    }
    fetchCounts();
    fetchCommunities();
    fetchAds();
    fetchProposalsBySender();
    fetchProposalsByRecipient();
  }, [user]);

  async function fetchCommunities() {
    try {
      const communitiesByUser = await getCommunitiesByUser(user.id);
      if (communitiesByUser.length > 0) {
        setCommunities(communitiesByUser);
        console.log("Comunidades carregadas com sucesso! ", communities);
      }
    } catch (error) {
      console.log("Error fetching communities", error);
    }
  }

  async function fetchAds() {
    try {
      const AdsByUser = await getItemsByUser(user.id);
      console.log("Ads carregados:", AdsByUser);
      if (AdsByUser.length > 0) {
        setAds(AdsByUser);
      } else {
        console.log("Nenhum ad encontrado, mantendo dados de teste");
      }
    } catch (error) {
      console.log("Error fetching ads", error);
    }
  }

  async function fetchProposalsBySender() {
    try {
      const proposalsBySender = await getProposalsBySender(user.id);
      if (proposalsBySender.length > 0) {
        setProposalsBySender(proposalsBySender);
      }
    } catch (error) {
      console.log("Error fetching communities", error);
    }
  }

  async function fetchProposalsByRecipient() {
    try {
      const proposalsByRecipient = await getProposalsByRecipient(user.id);
      if (proposalsByRecipient.length > 0) {
        setProposalsByRecipient(proposalsByRecipient);
      }
    } catch (error) {
      console.log("Error fetching communities", error);
    }
  }*/

  const handleOpenModal = (ad) => {
    setSelectedAd(ad);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAd(null);
  };

  return (
    <div className="font-inter flex w-full flex-col bg-[var(--color-background)]">
      <Header />
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-8 px-15 py-8">
        <section className="flex flex-col gap-4">
          <Breadcrumb />
          <div className="flex flex-row gap-8">
            <div className="flex flex-row items-center gap-4">
              <span className="relative h-32 w-32 rounded-full">
                {user?.profileImageUrl && (
                  <img
                    src={photoBg}
                    className="absolute top-0 left-0 h-full w-full"
                  />
                )}
                <img
                  src={user?.profileImageUrl || profilePic}
                  className="absolute top-0 left-0 h-full w-full rounded-full"
                />
              </span>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-end gap-4">
                  <span className="font-bricolage text-4xl leading-none font-medium text-[var(--color-title)]">
                    {user?.name}
                  </span>
                  <button
                    onClick={() => setShowModal(true)}
                    className="cursor-pointer"
                  >
                    <img src={editIcon} />
                  </button>
                </div>
                <span className="text-lg text-[var(--color-text)]">
                  Membro desde{" "}
                  {new Date(user?.createdAt).toLocaleDateString("pt-BR", {
                    year: "numeric",
                    month: "long",
                  })}
                </span>
              </div>
            </div>
            <div className="mx-8 h-[142px] w-px bg-[#E5E7EB]"></div>
            <div className="flex flex-1 flex-col justify-center gap-4">
              {user?.bio && (
                <p className="text-base text-[var(--color-text)]">{user.bio}</p>
              )}
              <ul className="font-bricolage flex flex-row justify-between text-lg font-medium text-[var(--color-title)]">
                <li className="flex flex-row items-center gap-2">
                  <span className="text-xl text-[var(--color-primary)]">
                    {acceptedProposals}
                  </span>{" "}
                  Trocas realizadas
                </li>
                <li className="flex flex-row items-center gap-2">
                  <span className="text-xl text-[var(--color-primary)]">
                    {availableItems}
                  </span>{" "}
                  Anúncios ativos
                </li>
                <li className="flex flex-row items-center gap-2">
                  <span className="text-xl text-[var(--color-primary)]">
                    {createdCommunities}
                  </span>{" "}
                  Comunidades criadas
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <nav>
            <ul className="flex flex-row justify-between gap-6 text-xl font-medium text-[var(--color-title)]">
              <li
                className={`rounded-xl px-4 py-1 transition-all duration-500 ease-in-out ${
                  activeTab === "my-communities"
                    ? "bg-[var(--color-tertiary)] text-[var(--color-primary)]"
                    : "text-[var(--color-title)]"
                } cursor-pointer hover:bg-[var(--color-tertiary)] hover:text-[var(--color-primary)]`}
              >
                <button
                  onClick={(e) => setActiveTab(e.currentTarget.id)}
                  id="my-communities"
                  className="cursor-pointer"
                >
                  Minhas comunidades
                </button>
              </li>
              <li
                className={`rounded-xl px-4 py-1 transition-all duration-500 ease-in-out ${
                  activeTab === "my-ads"
                    ? "bg-[var(--color-tertiary)] text-[var(--color-primary)]"
                    : "text-[var(--color-title)]"
                } cursor-pointer hover:bg-[var(--color-tertiary)] hover:text-[var(--color-primary)]`}
              >
                <button
                  onClick={(e) => setActiveTab(e.currentTarget.id)}
                  id="my-ads"
                  className="cursor-pointer"
                >
                  Meus anúncios
                </button>
              </li>
              <li
                className={`rounded-xl px-4 py-1 transition-all duration-500 ease-in-out ${
                  activeTab === "received-proposals"
                    ? "bg-[var(--color-tertiary)] text-[var(--color-primary)]"
                    : "text-[var(--color-title)]"
                } cursor-pointer hover:bg-[var(--color-tertiary)] hover:text-[var(--color-primary)]`}
              >
                <button
                  onClick={(e) => setActiveTab(e.currentTarget.id)}
                  id="received-proposals"
                  className="cursor-pointer"
                >
                  Propostas recebidas
                </button>
              </li>
              <li
                className={`rounded-xl px-4 py-1 transition-all duration-500 ease-in-out ${
                  activeTab === "sent-proposals"
                    ? "bg-[var(--color-tertiary)] text-[var(--color-primary)]"
                    : "text-[var(--color-title)]"
                } cursor-pointer hover:bg-[var(--color-tertiary)] hover:text-[var(--color-primary)]`}
              >
                <button
                  onClick={(e) => setActiveTab(e.currentTarget.id)}
                  id="sent-proposals"
                  className="cursor-pointer"
                >
                  Propostas enviadas
                </button>
              </li>
            </ul>
          </nav>
          <div className="grid grid-cols-3 justify-center gap-6">
            {activeTab === "my-communities" &&
              (communities?.length > 0 ? (
                communities.map((community) => (
                  <CommunityCard key={community.id} community={community} />
                ))
              ) : (
                <div className="col-span-3 py-12 text-center">
                  <div className="mb-4 text-gray-500">
                    <svg
                      className="mx-auto mb-4 h-16 w-16 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.196-2.121M9 20H4v-2a3 3 0 015.196-2.121M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <p className="text-lg">
                      Você ainda não criou nenhuma comunidade
                    </p>
                    <p className="text-sm">
                      Que tal criar sua primeira comunidade?
                    </p>
                  </div>
                </div>
              ))}

            {activeTab === "my-ads" &&
              (ads?.length > 0 ? (
                <div className="col-span-3 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {ads.map((ad) => (
                    <AdCard
                      key={ad.id}
                      ad={ad}
                      onViewDetails={() => handleOpenModal(ad)}
                    />
                  ))}
                </div>
              ) : (
                <div className="col-span-3 py-12 text-center">
                  <div className="mb-4 text-gray-500">
                    <svg
                      className="mx-auto mb-4 h-16 w-16 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-lg">
                      Você não criou nenhum anúncio ainda
                    </p>
                    <p className="text-sm">
                      Cadastre seus itens para que outros usuários façam suas
                      propostas de troca
                    </p>
                  </div>
                </div>
              ))}

            {activeTab === "received-proposals" &&
              (proposalsByRecipient?.length > 0 ? (
                proposalsByRecipient.map((proposal) => (
                  <ProposalCard
                    key={proposal.id}
                    type="received-proposals"
                    proposal={proposal}
                  />
                ))
              ) : (
                <div className="col-span-3 py-12 text-center">
                  <div className="mb-4 text-gray-500">
                    <svg
                      className="mx-auto mb-4 h-16 w-16 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-lg">
                      Você não recebeu nenhuma proposta ainda
                    </p>
                    <p className="text-sm">
                      Quando alguém interessar-se em seus itens, as propostas
                      aparecerão aqui
                    </p>
                  </div>
                </div>
              ))}

            {activeTab === "sent-proposals" &&
              (proposalsBySender?.length > 0 ? (
                proposalsBySender.map((proposal) => (
                  <ProposalCard
                    key={proposal.id}
                    type="sent-proposals"
                    proposal={proposal}
                  />
                ))
              ) : (
                <div className="col-span-3 py-12 text-center">
                  <div className="mb-4 text-gray-500">
                    <svg
                      className="mx-auto mb-4 h-16 w-16 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-lg">
                      Você não enviou nenhuma proposta ainda
                    </p>
                    <p className="text-sm">
                      Explore itens de outros usuários e faça suas propostas de
                      troca
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>

      <ProductModal
        isOpen={showModal}
        onClose={handleCloseModal}
        ad={selectedAd}
      />
      <ProfileModal isOpen={showModal} onClose={() => setShowModal(false)} />
      <Footer />
    </div>
  );
}
