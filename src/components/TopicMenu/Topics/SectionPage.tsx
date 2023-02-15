import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import fetch from '../../../api/fetch'
import Section from '../../../model/Character/Section.interface'
import AlignmentPage from './AlignmentPage'
import '../../styles/topics.css'
import BackgroundsPage from './BackgroundsPage'
import LanguagesPage from './LanguagesPage'
import InspirationPage from './InspirationPage'
import AdventuringGearPage from './AdventuringGear'
import ArmorPage from './ArmorPage'
import EquipmentPage from './EquipmentPage'
import EquipmentPacksPage from './EquipmentPack'
import ExpensesPage from './ExpensesPage'
import MountsVehiclesPage from './MountsVehiclesPage'
import SellingTreasurePage from './SellingTreasure'
import ToolsPage from './ToolsPage'
import TradeGoodsPage from './TradeGoodsPage'
import WeaponsPage from './WeaponsPage'
import ConditionsPage from './ConditionsPage'
import DiseasesPage from './DiseasesPage'
import MadnessPage from './MadnessPage'
import ObjectsPage from './ObjectsPage'
import PoisonsPage from './PoisonsPage'
import TrapsPage from './TrapsPage'
import SpellCastingPage from './SpellCastingPage'
import PantheonsPage from './PantheonsPage'
import { CSSTransition } from 'react-transition-group'
import '../../styles/SectionAnimations.css'

function SectionPage() {
    const { sectionSlug } = useParams()
    const { data, status } = useQuery(['sections', sectionSlug], FetchSection)
    var splitDesc: string[] | undefined = [] 
    
    
    function FetchSection(): Promise<Section> {
        return fetch(`https://api.open5e.com/sections/${sectionSlug}`)
    }
    function modifyData() {
        if (data !== undefined) {
            splitDesc = data?.desc.split('\n\n')
        }
    }

    if (data !== undefined) {
        modifyData()
    }
    
    return<>
        <div
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginBottom: '10px',
                color: 'white',
            }}>

                {data?.name === 'Alignment' ? (
                    <CSSTransition
                    in={true}
                    appear={true}
                    timeout={1000}
                    classNames="fade">
                        <AlignmentPage name={data?.name} splitDesc={splitDesc}/>
                    </CSSTransition>
                ): data?.name === 'Backgrounds' ? (
                    <CSSTransition
                        in={true}
                        appear={true}
                        timeout={1000}
                        classNames="fade">
                        <BackgroundsPage name={data?.name} splitDesc={splitDesc}/>
                    </CSSTransition>
                ): data?.name === 'Inspiration' ? (
                    <CSSTransition
                        in={true}
                        appear={true}
                        timeout={1000}
                        classNames="fade">
                        <InspirationPage name={data?.name} splitDesc={splitDesc}/>
                    </CSSTransition>
                ): data?.name === 'Languages' ? (
                    <CSSTransition
                    in={true}
                    appear={true}
                    timeout={1000}
                    classNames="fade">
                    <LanguagesPage name={data?.name} splitDesc={splitDesc}/>
                    </CSSTransition>
                ) : data?.name === 'Adventuring Gear' ? (
                                        <CSSTransition
                    in={true}
                    appear={true}
                    timeout={1000}
                    classNames="fade">
                    <AdventuringGearPage name={data?.name} splitDesc={splitDesc}/>
                    </CSSTransition>
                ) : data?.name === 'Armor' ? (
                                        <CSSTransition
                    in={true}
                    appear={true}
                    timeout={1000}
                    classNames="fade">
                    <ArmorPage name={data?.name} splitDesc={splitDesc}/>
                    </CSSTransition>
                ) : data?.name === 'Equipment' ? (
                                        <CSSTransition
                    in={true}
                    appear={true}
                    timeout={1000}
                    classNames="fade">
                    <EquipmentPage name={data?.name} splitDesc={splitDesc} />
                    </CSSTransition>
                ) : data?.name === 'Equipment Packs' ? (
                                        <CSSTransition
                    in={true}
                    appear={true}
                    timeout={1000}
                    classNames="fade">
                    <EquipmentPacksPage name={data?.name} splitDesc={splitDesc} />
                    </CSSTransition>
                ) : data?.name === 'Expenses' ? (
                                        <CSSTransition
                    in={true}
                    appear={true}
                    timeout={1000}
                    classNames="fade">
                    <ExpensesPage name={data?.name} splitDesc={splitDesc} />
                    </CSSTransition>
                ) : data?.name === 'Mounts and Vehicles' ? (
                                        <CSSTransition
                    in={true}
                    appear={true}
                    timeout={1000}
                    classNames="fade">
                    <MountsVehiclesPage name={data?.name} splitDesc={splitDesc} />
                    </CSSTransition>
                ): data?.name === 'Selling Treasure' ? (
                                        <CSSTransition
                    in={true}
                    appear={true}
                    timeout={1000}
                    classNames="fade">
                    <SellingTreasurePage name={data?.name} splitDesc={splitDesc} />
                    </CSSTransition>
                ): data?.name === 'Tools' ? (
                                        <CSSTransition
                    in={true}
                    appear={true}
                    timeout={1000}
                    classNames="fade">
                    <ToolsPage name={data?.name} splitDesc={splitDesc} />
                    </CSSTransition>
                ): data?.name === 'Trade Goods' ? (
                                        <CSSTransition
                    in={true}
                    appear={true}
                    timeout={1000}
                    classNames="fade">
                    <TradeGoodsPage name={data?.name} splitDesc={splitDesc}  />
                    </CSSTransition>
                ): data?.name === 'Weapons' ? (
                                        <CSSTransition
                    in={true}
                    appear={true}
                    timeout={1000}
                    classNames="fade">
                    <WeaponsPage name={data?.name} splitDesc={splitDesc}  />
                    </CSSTransition>
                ): data?.name === 'Conditions' ? (
                                        <CSSTransition
                    in={true}
                    appear={true}
                    timeout={1000}
                    classNames="fade">
                    <ConditionsPage name={data?.name} splitDesc={splitDesc}  />
                    </CSSTransition>
                ): data?.name === 'Diseases' ? (
                                        <CSSTransition
                    in={true}
                    appear={true}
                    timeout={1000}
                    classNames="fade">
                    <DiseasesPage name={data?.name} splitDesc={splitDesc}  />
                    </CSSTransition>
                ): data?.name === 'Madness' ? (
                                        <CSSTransition
                    in={true}
                    appear={true}
                    timeout={1000}
                    classNames="fade">
                    <MadnessPage name={data?.name} splitDesc={splitDesc}  />
                    </CSSTransition>
                ): data?.name === 'Objects' ? (
                                        <CSSTransition
                    in={true}
                    appear={true}
                    timeout={1000}
                    classNames="fade">
                    <ObjectsPage name={data?.name} splitDesc={splitDesc}  />
                    </CSSTransition>
                ): data?.name === 'Poisons' ? (
                                        <CSSTransition
                    in={true}
                    appear={true}
                    timeout={1000}
                    classNames="fade">
                    <PoisonsPage name={data?.name} splitDesc={splitDesc}  />
                    </CSSTransition>
                ): data?.name === 'Traps' ? (
                                        <CSSTransition
                    in={true}
                    appear={true}
                    timeout={1000}
                    classNames="fade">
                    <TrapsPage name={data?.name} splitDesc={splitDesc}  />
                    </CSSTransition>
                ): data?.name === 'Spellcasting' ? (
                                        <CSSTransition
                    in={true}
                    appear={true}
                    timeout={1000}
                    classNames="fade">
                    <SpellCastingPage name={data?.name} splitDesc={splitDesc}  />
                    </CSSTransition>
                ): data?.name === 'Pantheons' ? (
                                        <CSSTransition
                    in={true}
                    appear={true}
                    timeout={1000}
                    classNames="fade">
                    <PantheonsPage name={data?.name} splitDesc={splitDesc}  />
                    </CSSTransition>
                ): (
                    <div></div>
                )}
        </div>
    </>
}

export default SectionPage
