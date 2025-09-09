import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import CreateAdModal from "../components/ProductDetail";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import memberIcon from "../assets/icons/member-icon.svg";
import {
  getCommunityById,
} from "../services/community-service";
import { createItem } from "../services/item-service";
import { useAds } from "../queries/use-ads.js";
import AdCard from "../components/AdCard.jsx";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../contexts/UserContext.jsx";

const Community = () => {
  const { communityId } = useParams();
  const [showAddModal, setShowAddModal] = useState(false);
  // const [community, setCommunity] = useState(null);
  // const [ads, setAds] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [adsLoading, setAdsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const user = useUser()

  if (!user) {
    navigate("/login");
  }

  // Carregar dados da comunidade
  // const loadCommunityData = useCallback(async () => {
  //   try {
  //     setLoading(true);
  //     console.log("Carregando dados da comunidade:", communityId);
  //     const data = await getCommunityById(communityId);
  //     setCommunity(data);
  //   } catch (err) {
  //     console.error("Erro ao carregar dados da comunidade:", err);
  //     setCommunity(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [communityId]);

  const {data: communityData, isLoading: isLoadingCommunity} = useQuery(
    {
      queryKey: ['Community', communityId],
    queryFn: () => getCommunityById(communityId)}

  )
  const { data: adsData, isLoading: isLoadingAds } = useAds(communityId);

  const ads = adsData || [];
  const { community } = communityData || {}


  // useEffect após definição dos métodos


  // const handleSearchAds = useCallback(
  //   async (term) => {
  //     try {
  //       setAdsLoading(true);
  //       if (term.trim()) {
  //         const data = await searchCommunityAds(communityId, term);
  //         setAds(data);
  //       } else {
  //         await loadCommunityAds();
  //       }
  //     } catch (err) {
  //       console.error("Erro ao buscar anúncios:", err);
  //       setAds([]);
  //     } finally {
  //       setAdsLoading(false);
  //     }
  //   },
  //   [communityId, loadCommunityAds]
  // );

  const handleCreateAd = async (adData) => {
    try {
      const newAd = await createItem(communityId, adData);
      setShowAddModal(false);
      console.log("Anúncio criado com sucesso:", newAd);
    } catch (err) {
      console.error("Erro ao criar anúncio:", err);
      setShowAddModal(false);
    }
  };

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     if (communityId) {
  //       handleSearchAds(searchTerm);
  //     }
  //   }, 500);
  //   return () => clearTimeout(timeoutId);
  // }, [searchTerm, communityId, handleSearchAds]);

  console.log('Community Data:', community);
  console.log('Ads Data:', ads);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-4">
          <Breadcrumb community={community} />
          {/* Community Info */}
          {isLoadingCommunity ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">
                Carregando comunidade...
              </span>
            </div>
          ) : community ? (
            <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-6">
                <img
                  src={community.imageUrl || "https://placehold.net/400x400.png"}
                  alt={community.name}
                  className="h-20 w-20 rounded-full border-2 border-blue-200 object-cover"
                  onError={ (e) => {
                    e.target.src =
                      "https://placehold.net/400x400.png"; } }
                />
                <div>
                  <h1 className="mb-1 text-2xl font-bold text-gray-900">
                    {community.name}
                  </h1>
                  <p className="mb-2 text-gray-600">{community.description}</p>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-start gap-2 text-xs text-gray-500">
                      <img src={memberIcon} alt="Membros" />
                      {community.memberCount} membros
                    </span>
                  </div>
                </div>
              </div>
              <button
                className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                onClick={() => setShowAddModal(true)}
              >
                + Criar Anúncio
              </button>
            </div>
          ) : null}

          {/* Search Bar */}
          {isLoadingCommunity && (
            <div className="mb-6">
              <input
                type="text"
                placeholder="Buscar anúncios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 w-full rounded-lg border border-gray-300 px-4 py-2 transition-colors focus:border-blue-500 focus:outline-none"
                disabled={isLoadingAds}
              />
            </div>
          )}

          {/* Ads Loading */}
          {isLoadingAds && (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Carregando anúncios...</span>
            </div>
          )}

          {/* Ads Grid */}
          {!isLoadingAds && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {ads.map((ad) => (
                <AdCard
                  key={ad.id}
                  ad={ad}
                />
              ))}

              {ads.length === 0 && !isLoadingAds && (
                <div className="col-span-full py-12 text-center">
                  <p className="text-lg text-gray-500">
                    {searchTerm
                      ? "Nenhum anúncio encontrado para esta busca."
                      : "Nenhum anúncio disponível nesta comunidade."}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        <CreateAdModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleCreateAd}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Community;
