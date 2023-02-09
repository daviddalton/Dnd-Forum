import '../../components/styles/topics.css'
import { useState } from 'react';
import SectionData from '../../api/SectionData';
import { useQuery } from '@tanstack/react-query';
import TopicAccordion from './TopicAccordions/TopicAccordion';
import CharacterClassData from '../../api/CharacterClassData';
import RacesData from '../../api/RacesData';
import SpellData from '../../api/SpellData';

const sectionsData = new SectionData()
const classesData = new CharacterClassData()
const racesData = new RacesData()
class Topic {
  name!: string;
  subPath!: string;
  url!: string;
  slug!: string;
  subTopics: any[] = []
  data!: any;
}

function GetSectionsData() {
  var returnData: any
  const { data, status } = useQuery(['sections'], sectionsData.fetchSections)
  returnData = data
  return returnData
} 
function GetClassesData() {
  var returnData: any
  const { data, status } = useQuery(['classes'], classesData.fetchClasses)
  returnData = data
  return returnData
}
function GetRacesData() {
  var returnData: any
  const { data, status } = useQuery(['races'], racesData.fetchRaces)
  returnData = data
  return returnData
}
function TopicMenu(props: any){
  
  const sectionsData = GetSectionsData()
  const classesData = GetClassesData()
  const racesData = GetRacesData()
  const [search, setSearch] = useState(" ");
  const spellClasses = ["Bard", "Cleric", "Druid", "Paladin", "Sorcerer", "Wizard", "Warlock"]
  const handleInput = (event: { target: { value: any; }; }) => {
    setSearch(event.target.value);
}
  var characters = new Topic()
    characters.name = 'Characters'
  var equipment = new Topic()
    equipment.name = 'Equipment'
  var rules = new Topic()
    rules.name = 'Rules'
  var appendixes = new Topic()
    appendixes.name = 'Appendix'
  var spellcasting = new Topic()
    spellcasting.name = 'Spellcasting'
  var classes = new Topic()
    classes.name = 'Classes'
  var races = new Topic()
    races.name = 'Races'
  var magicItems = new Topic()
    magicItems.name = 'Magic Items'
  var spells = new Topic()
    spells.name = 'Spells'

  function sortSectionsData() {
    for (let topic of sectionsData.results) {
      let parentTopic = topic.parent
      if (parentTopic === 'Equipment') {
        equipment.subTopics.push(topic)
      } else if (parentTopic === 'Characters') {
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
        var tempVar = new Topic()
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
            <input className='topic-menu-search-input'
              onChange={handleInput} 
              placeholder="  Search:"
              />
        </div>
        {topics.map((topic: Topic) => (
          <TopicAccordion key={topic.name} topic={topic} handleDrawerClose={props.handleDrawerClose}/>
        ))}  
    </div>
    </>
  );
}

export default TopicMenu