import { QUERY_USERS } from "../../utils/queries";
import { useQuery } from "@apollo/client";

function MigrationPatternSelect() {

  const { loading, error, data } = useQuery(QUERY_USERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const migrationPatternOptions = [
    "Pick A Migration Pattern!",
    "New Zealand to Alaska",
    "Arctic to Antarctic and Back",
    "Eastern United States to Central America",
    "Northern Europe to the Mediterranean",
    "North America to South America",
    "North and South America to the Caribbean",
    "Europe to Africa",
    "Southern South America to the Arctic",
    "New Zealand to Alaska and Siberia",
    "North America to Central America",
  ];

  const handleSelectChange = (event) => {
    const migrationPattern = event.target.value;
    const filteredUsers = getFilteredUsers(migrationPattern, data);
    // display the filtered users
  };
  return (
    <div className="leftSide">
      <select id="migration-pattern-select" onChange={handleSelectChange}>
        {migrationPatternOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

const getFilteredUsers = (migrationPattern, data) => {
  if (!data || !data.users) return [];
  const filteredUsers = data.users.filter((user) => {
    return user.Migration === migrationPattern;
  });
  return filteredUsers;
};
export default MigrationPatternSelect;