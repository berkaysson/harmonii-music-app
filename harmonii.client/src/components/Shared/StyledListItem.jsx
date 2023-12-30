import styled from "styled-components";

export const StyledListItem = styled.li`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  border-radius: .2rem;
  background-color: var(--dark-blue-color);
  position: relative;

  span {
    margin-left: .5rem;
    padding: 0 .5rem;
    min-width: 50px;
    display: flex;
    align-items: center;
  }

  .list-cover-img{
    width: 50px;
    height: 50px;
    padding: 0;
    margin: 0;
  }

  .list-play-btn{
    width: 50px;
    font-size: 30px;
  }

  .list-song-info{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    span:last-child{
      font-size: 12px;
      color: var(--pink-color);
    }
  }

  .list-add-to-playlist{
    position: absolute;
    height: 100%;
    right: 1rem;

    .dropdown{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: .7rem;

      .dropdown-menu{
        display:flex;
        gap: .4rem;
      }
    }
  }
`;