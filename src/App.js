import './App.css';
import { getStates } from './fakeAPI';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  max-width: 50%;
  margin: 1rem auto;
  text-align: center;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  input {
    width: 100%;
  }
`;

const StatesList = styled.ul`
  list-style: none;
  padding: 0;
  li {
    padding: 1rem;
    border: 1px solid #ccc;
  }
`;

const TextInput = styled.input`
  border: none;
  border-bottom: 1px solid #ccc;
  padding: .5rem;
  box-sizing: border-box;
  margin-bottom: .5rem;
`;

const SearchButton = styled.button`
  background: #eee;
  border: none;
  cursor: pointer;
  padding: .4rem;
  &:hover {
    background: #444;
    color: white;
  }
`;

function App() {
  const [usrQuery, setUsrQuery] = useState('');
  const [countryStates, setCountryStates] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    getStates().then(data => setCountryStates(data));
  }, []);

  return (
    <MainContainer>
      <SearchContainer>
        <TextInput
          type="text"
          value={usrQuery}
          placeholder="Please enter your query"
          onChange={e => setUsrQuery(e.target.value)}
        />
        <SearchButton
          onClick={() => setFilter(usrQuery)}
        >
          Search
      </SearchButton>
      </SearchContainer>
      <StatesList>
        {
          countryStates.length > 0 ?
            countryStates
              .filter(entry =>
                entry.name.toLowerCase().indexOf(filter.toLowerCase()) > -1 && entry
              )
              .map(entry =>
                <li
                  key={`country-state-${entry.id}`}
                >
                  {entry.name}
                </li>
              ) :
            "Loading states..."
        }
      </StatesList>
    </MainContainer>
  );
}

export default App;
