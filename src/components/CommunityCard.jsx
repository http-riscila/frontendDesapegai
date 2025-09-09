import { useState, useEffect } from "react";
import {
  countMembersByCommunity,
  createMember,
  getMembersByCommunityAndUser,
} from "../services/member-service";
import memberIcon from "../assets/icons/member-icon.svg";
import { useUser } from "../contexts/UserContext.jsx";
import ConfirmModal from "./ConfirmModal.jsx";
import { useNavigate } from "react-router-dom";


export default function CommunityCard({ community }) {
  // const [membersCount, setMembersCount] = useState(0);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const navigate = useNavigate()
  const { user } = useUser();

  const userId = user?.id;
  const communityId = community?.id;

  // Retorna o número de membros da comunidade sem precisar de um useEffect
  // A propriedade _count.members já está existe no objeto community
  const membersCount = community?._count.members

  // useEffect(() => {
  //   async function fetchMembersCount() {
  //     try {
  //
  //       const memberCountData = await countMembersByCommunity(community?.id);
  //       setMembersCount(memberCountData);
  //     } catch (error) {
  //       console.log("Error fetching count data", error);
  //     }
  //   }
  //   fetchMembersCount();
  // });

  const handleCommunityClick = async () => {
    const membership = await getMembersByCommunityAndUser(communityId, userId);
    console.log("Membership:", membership);
    const isMember = membership !== null;
    if (isMember) {
      navigate(`/comunidades/${communityId}`);
    } else {
      setShowJoinModal(true);
    }
  };

  const handleJoinCommunity = async () => {
    try {
      await createMember({
        userId,
        communityId,
        isAdmin: false,
      });
      setShowJoinModal(false);
      navigate(`/comunidades/${communityId}`);
    } catch (error) {
      console.error("Erro ao entrar na comunidade:", error);
      setShowJoinModal(false);
    } finally {
      setShowJoinModal(false);
    }
  };

  return (
    <div className="flex max-h-[507px] max-w-[399px] flex-col overflow-hidden">
      {/* Imagem da comunidade */}
      <div className="flex h-40 w-full items-center justify-center overflow-hidden rounded-t-xl bg-gray-200">
        <img
          src={community.imageUrl || "https://placehold.net/400x400.png"}
          alt="Imagem da comunidade"
          className="h-full w-full object-cover"
          onError={(e) => {
            e.target.src = "https://placehold.net/400x400.png";
          }}
        />
      </div>
      {/* Conteúdo do card */}
      <div className="flex flex-1 flex-col gap-4 rounded-b-xl border border-t-0 border-x-[var(--color-primary)] border-b-[var(--color-primary)] p-6">
        <div className="flex flex-row items-center justify-end gap-2 text-xs text-[var(--color-text)]">
          <img src={memberIcon} alt={'member icon'}/>
          <span className="flex flex-row gap-1">
            {membersCount ?? 0} {membersCount === 1 ? "membro" : "membros"}
          </span>
        </div>
        <div>
          <h5 className="text-xl font-bold text-gray-900">{community?.name}</h5>

          <p className="flex-1 text-base text-gray-600">
            {community?.description}
          </p>
        </div>
        <button
          onClick={() => handleCommunityClick()}
          className={`w-full cursor-pointer rounded-2xl border-0 bg-[var(--color-primary)] py-3 text-xl font-medium text-white transition-colors duration-700 hover:bg-[var(--color-tertiary)]`}
        >
          Acessar
        </button>
      </div>
      <ConfirmModal
        isOpen={showJoinModal}
        message={`Você deseja entrar na comunidade "${community?.name}"?`}
        onClose={() => setShowJoinModal(false)}
        onConfirm={() => handleJoinCommunity()}
      />
    </div>
  );
}
