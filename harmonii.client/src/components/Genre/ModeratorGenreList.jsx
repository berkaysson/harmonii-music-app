/* eslint-disable react/prop-types */
import styled from "styled-components";
import { StyledList } from "../Shared/StyledList";
import DeleteGenreButton from "./DeleteGenreButton";

const ModeratorGenreList = ({ genresList, fetchData }) => {
  return (
    <div>
      <h3>Genres</h3>
      <StyledList>
        {genresList.map((genre) => (
          <StyledModeratorGenreListItem key={genre.genreId}>
            <span>
              Genre Id: {genre.genreId}
            </span>
            <span>
              Genre Name: {genre.genreName}
            </span>
            <span>
              {
                <DeleteGenreButton
                  genreId={genre.genreId}
                  onDelete={fetchData}
                />
              }
            </span>
          </StyledModeratorGenreListItem>
        ))}
      </StyledList>
    </div>
  );
};

export default ModeratorGenreList;

const StyledModeratorGenreListItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  border-radius: 0.2rem;
  border: 1px solid var(--turq-color-2);
  background-color: var(--dark-blue-color);
  position: relative;
  padding: 1rem;
  margin-bottom: .4rem;
  gap: 2rem;

  span {
    margin-left: 0.5rem;
    padding: 0 0.5rem;
    min-width: 50px;
    display: flex;
    align-items: center;
  }

  span:last-child{
    position: absolute;
    right: 1rem;
  }
`;
