import './styles/App.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Wiki from "./TopicMenu/Topics/Wiki";
import Header from './Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Create from './creation/CreatedChars/CharacterSelection';
import NoPage from './NoPage';
import BackgroundsPage from './TopicMenu/Topics/BackgroundsPage';
import SpellsPage from './TopicMenu/Topics/Spells/SpellsPage';
import ClassSpellsPage from './TopicMenu/Topics/Spells/ClassSpellsPage';
import ClassPage from './TopicMenu/Topics/ClassPage';
import SectionPage from './TopicMenu/Topics/SectionPage';
import RacePage from './TopicMenu/Topics/RacePage';
import MonstersPage from './TopicMenu/Topics/MonstersPage';
import CreatedCharPage from './creation/CreatedChars/CreatedCharPage';
import CharCreation from './creation/CharCreator';
import LoginPage from './LoginPage';
import Home from './Home';
import WikiDesc from './TopicMenu/Topics/WikiDesc';
import MagicItemsPage from './TopicMenu/Topics/MagicItemsPage';
import LanguagesPage from './TopicMenu/Topics/LanguagesPage';
import AuthRoute from './AuthRoute';
import SignUpPage from './SignUpPage';
import CreateLayout from './creation/CreateLayout';

const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>

        <div className="App"
                  >
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/wiki" element={<Wiki/>}>
                  <Route index element={<WikiDesc />} />
                  <Route path="backgrounds" element={<BackgroundsPage/>}/>
                  <Route path="classes/:classSlug" element={<ClassPage/>} />
                  <Route path="languages" element={<LanguagesPage/>}/>
                  <Route path="magicitems" element={<MagicItemsPage />} />
                  <Route path="monsters" element={<MonstersPage/>}/>
                  <Route path="races/:raceSlug" element={<RacePage/>}/>
                  <Route path="sections/:sectionSlug" element={<SectionPage />}/>
                  <Route path="spells" element={<SpellsPage/>}/>
                  <Route path="spells/:clazzSlug" element={<ClassSpellsPage/>}/>
                  <Route path='*' element={<NoPage/>}/>
                </Route>
                
                <Route path="/create" element={
                  <AuthRoute>
                    <CreateLayout/>
                  </AuthRoute>}>
                  <Route path='character-select' element={<Create/>}/>
                  <Route path="character-select/:id" element={<CreatedCharPage/>}/>
                  <Route path="character-select/new-character/character-creator" element={<CharCreation/>}/>
                </Route>
                  <Route path="login" element={<LoginPage/>}/>
                  <Route path="signUp" element={<SignUpPage/>}/>
                
              </Routes>
            </BrowserRouter>
        </div>


      </QueryClientProvider>

  );
}

export default App;