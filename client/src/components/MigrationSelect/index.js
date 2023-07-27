const MigrationSelect = ({ handleSelectChange }) => {

    return (
      <div>
        <div className="sort-container">
          <label htmlFor="migration-pattern-select">
            Sort by Migration Pattern:
          </label>
          <select id="migration-pattern-select" onChange={handleSelectChange}>
            <option value="">All</option>
            <option value="New Zealand to Alaska">New Zealand to Alaska</option>
            <option value="Arctic to Antarctic and Back">
              Arctic to Antarctic and Back
            </option>
            <option value="Eastern United States to Central America">
              Eastern United States to Central America
            </option>
            <option value="Northern Europe to the Mediterranean">
              Northern Europe to the Mediterranean
            </option>
            <option value="North America to South America">
              North America to South America
            </option>
            <option value="North and South America to the Caribbean">
              North and South America to the Caribbean
            </option>
            <option value="Europe to Africa">Europe to Africa</option>
            <option value="Southern South America to the Arctic">
              Southern South America to the Arctic
            </option>
            <option value="New Zealand to Alaska and Siberia">
              New Zealand to Alaska and Siberia
            </option>
            <option value="North America to Central America">
              North America to Central America
            </option>
          </select>
        </div>
      </div>
    );
  };

   export default MigrationSelect;