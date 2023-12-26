// eslint-disable-next-line react/prop-types
const ModeratorGenreList = ({ genresList, fetchData }) => {
  return (
    <div>
      All genres table
      <ul>
        {genresList.map((genre) => (
          <li key={genre.genreId}>
            {genre.genreName}
            <span>
              {
                //delete genre button
              }
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModeratorGenreList;
