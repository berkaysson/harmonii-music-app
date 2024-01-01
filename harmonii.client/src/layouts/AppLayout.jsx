import RouterComponent from '../routers/Router';
import Navigation from '../components/Navigation/Navigation';
import styled from 'styled-components';
import AudioPlayer from '../components/Song/AudioPlayer';
import { useUserContext } from '../services/hooks/useUser';

const AppLayout = () => {
  const { userValid } = useUserContext();

  return (
    <StyledAppLayout>
      <Navigation />
      <RouterComponent />
      {userValid && <AudioPlayer />}
    </StyledAppLayout>
  );
};

export default AppLayout;

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto 120px;
  height: 100%;
  position: relative;

  @media(max-width: 700px){
    font-size: 16px;
  }

  #nav-controller {
    display: none;
    z-index: 999;
    background-color: var(--turq-color-3);
    color: var(--dark-blue-color);
    font-size: 38px;
    padding: 0.4rem;
    border: 3px solid var(--pink-color);
    border-radius: 10rem;

    &:hover {
      background-color: var(--turq-color-2);
    }

    @media (max-width: 1300px) {
      display: inline-block;
      position: fixed;
      right: .2rem;
      top: .2rem;
    }
  }
`;
