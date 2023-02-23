import '../../components/styles/topics.css'
import { useState } from 'react';
import SectionData from '../../api/SectionData';
import { useQuery } from '@tanstack/react-query';
import TopicAccordion from './TopicAccordions/TopicAccordion';
import CharacterClassData from '../../api/CharacterClassData';
import RacesData from '../../api/RacesData';
import { useNavigate } from 'react-router-dom';
import { TopicMenuTopic } from '../../model/Character/TopicMenuTopic';

const sectionsData = new SectionData()
const classesData = new CharacterClassData()
const racesData = new RacesData()


function GetSectionsData() {
  var returnData: any
  const { data } = useQuery(['sections'], sectionsData.fetchSections)
  returnData = data
  return returnData
} 
function GetClassesData() {
  var returnData: any
  const { data } = useQuery(['classes'], classesData.fetchClasses)
  returnData = data
  return returnData
}
function GetRacesData() {
  var returnData: any
  const { data } = useQuery(['races'], racesData.fetchRaces)
  returnData = data
  return returnData
}
function TopicMenu(props: any){
  
  const sectionsData = GetSectionsData()
  const classesData = GetClassesData()
  const racesData = GetRacesData()
  const [search, setSearch] = useState(" ");
  const spellClasses = ["Bard", "Cleric", "Druid", "Paladin", "Sorcerer", "Wizard", "Warlock"]
  const navigate = useNavigate()
  
  const handleInput = (event: { target: { value: any; }; }) => {
    setSearch(event.target.value);
}
  var characters = new TopicMenuTopic()
    characters.name = 'Characters'
  var equipment = new TopicMenuTopic()
    equipment.name = 'Equipment'
  var rules = new TopicMenuTopic()
    rules.name = 'Rules'
  var appendixes = new TopicMenuTopic()
    appendixes.name = 'Appendix'
  var spellcasting = new TopicMenuTopic()
    spellcasting.name = 'Spellcasting'
  var classes = new TopicMenuTopic()
    classes.name = 'Classes'
  var races = new TopicMenuTopic()
    races.name = 'Races'
  var magicItems = new TopicMenuTopic()
    magicItems.name = 'Magic Items'
  var spells = new TopicMenuTopic()
    spells.name = 'Spells'

  function sortSectionsData() {
    for (let topic of sectionsData.results) {
      let parentTopic = topic.parent
      if (parentTopic === 'Equipment') {
        equipment.subTopics.push(topic)
      } else if (parentTopic === 'Characters' || parentTopic === 'Character Advancement') {
        characters.subTopics.push(topic)
      } else if (parentTopic === 'Rules') {
        rules.subTopics.push(topic)
      } else if (parentTopic === 'Appendix') {
        appendixes.subTopics.push(topic)
      } else if (parentTopic === 'Spellcasting') {
        spellcasting.subTopics.push(topic)
      }
    }
  }
  function sortClassesData() {
    if (classesData !== undefined) {
      for (let clazz of classesData.results) {
        classes.subTopics.push(clazz)
      }
    }
  }
  function sortRacesData() {
    if (racesData !== undefined) {
      for (let race of racesData.results) {
        races.subTopics.push(race)
      } 
    }
  }
  function createSpellSubTopics() {
      for (let clazz of spellClasses) {
        var tempVar = new TopicMenuTopic()
        tempVar.name = clazz
        tempVar.slug = clazz
        spells.subTopics.push(tempVar)
      }
    }

  if (sectionsData !== undefined && classesData !== undefined) {
    sortSectionsData()
    sortClassesData()
    sortRacesData()
    createSpellSubTopics()
  }

  const topics = [characters, classes, equipment, magicItems, races, rules, spells, spellcasting, appendixes]

  return (
    <>
    <div className='topic-menu-main-container'>
        <div className='topic-menu-input-accordion-container'>
          <form
            onSubmit={() => navigate(`wiki/search/${search}`)}>
            <input className='topic-menu-search-input'
              onChange={handleInput}
              placeholder="  Search:"
              />
            </form>
        </div>
        {topics.map((topic: TopicMenuTopic) => (
          <TopicAccordion key={topic.name} topic={topic} handleDrawerClose={props.handleDrawerClose}/>
        ))}  
    </div>
    </>
  );
}

export default TopicMenu