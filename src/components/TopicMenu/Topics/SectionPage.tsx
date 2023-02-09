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
            console.log(splitDesc)
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
                    <AlignmentPage name={data?.name} splitDesc={splitDesc}/>
                ): data?.name === 'Backgrounds' ? (
                    <BackgroundsPage name={data?.name} splitDesc={splitDesc}/>
                ): data?.name === 'Inspiration' ? (
                    <InspirationPage name={data?.name} splitDesc={splitDesc}/>
                ): data?.name === 'Languages' ? (
                    <LanguagesPage name={data?.name} splitDesc={splitDesc}/>
                ) : data?.name === 'Adventuring Gear' ? (
                    <AdventuringGearPage name={data?.name} splitDesc={splitDesc}/>
                ) : data?.name === 'Armor' ? (
                    <ArmorPage name={data?.name} splitDesc={splitDesc}/>
                ) : data?.name === 'Equipment' ? (
                    <EquipmentPage name={data?.name} splitDesc={splitDesc} />
                ) : data?.name === 'Equipment Packs' ? (
                    <EquipmentPacksPage name={data?.name} splitDesc={splitDesc} />
                ) : data?.name === 'Expenses' ? (
                    <ExpensesPage name={data?.name} splitDesc={splitDesc} />
                ) : data?.name === 'Mounts and Vehicles' ? (
                    <MountsVehiclesPage name={data?.name} splitDesc={splitDesc} />
                ): data?.name === 'Selling Treasure' ? (
                    <SellingTreasurePage name={data?.name} splitDesc={splitDesc} />
                ): data?.name === 'Tools' ? (
                    <ToolsPage name={data?.name} splitDesc={splitDesc} />
                ): data?.name === 'Trade Goods' ? (
                    <TradeGoodsPage name={data?.name} splitDesc={splitDesc}  />
                ): data?.name === 'Weapons' ? (
                    <WeaponsPage name={data?.name} splitDesc={splitDesc}  />
                ): data?.name === 'Conditions' ? (
                    <ConditionsPage name={data?.name} splitDesc={splitDesc}  />
                ): data?.name === 'Diseases' ? (
                    <DiseasesPage name={data?.name} splitDesc={splitDesc}  />
                ): data?.name === 'Madness' ? (
                    <MadnessPage name={data?.name} splitDesc={splitDesc}  />
                ): data?.name === 'Objects' ? (
                    <ObjectsPage name={data?.name} splitDesc={splitDesc}  />
                ): data?.name === 'Poisons' ? (
                    <PoisonsPage name={data?.name} splitDesc={splitDesc}  />
                ): data?.name === 'Traps' ? (
                    <TrapsPage name={data?.name} splitDesc={splitDesc}  />
                ): data?.name === 'Spellcasting' ? (
                    <SpellCastingPage name={data?.name} splitDesc={splitDesc}  />
                ): data?.name === 'Pantheons' ? (
                    <PantheonsPage name={data?.name} splitDesc={splitDesc}  />
                ): (
                    <div></div>
                )}
        </div>
    </>
}

export default SectionPage
