import styled from "styled-components";
import { useUser } from "./useUser";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  font-size: 0.8em;
  overflow: hidden;
  background-color: var(--color-grey-50);
  border: 2px solid var(--color-grey-100);
`;

const Avatar = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  font-size: 0.8em;
`;

function UserAvatar() {
  const { user } = useUser();
  const { fullName, avatar } = user.user_metadata;

  return (
    <StyledUserAvatar>
      <Wrapper>
        <Avatar
          src={avatar || "default-user.jpg"}
          alt="Avatar"
        />
      </Wrapper>
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
