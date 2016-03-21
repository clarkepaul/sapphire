import React from 'react';
import SilverStripeComponent from 'silverstripe-component';
import NorthHeader from '../../components/north-header';
import GridField from '../../components/grid-field';
import GridFieldHeader from '../../components/grid-field-header';
import GridFieldHeaderCell from '../../components/grid-field-header-cell';
import GridFieldRow from '../../components/grid-field-row';
import GridFieldCell from '../../components/grid-field-cell';
import Action from '../../components/action';

class CampaignAdminContainer extends SilverStripeComponent {

    constructor(props) {
        super(props);

        // TODO: This will be an AJAX call and it's response stored in state.
        this.mockData = {
            campaigns: [
                {
                    title: 'SilverStripe 4.0 release',
                    description: 'All the stuff related to the 4.0 announcement',
                    changes: 20
                },
                {
                    title: 'March release',
                    description: 'march release stuff',
                    changes: 2
                },
                {
                    title: 'About us',
                    description: 'The team',
                    changes: 1345
                }
            ]
        };
    }

    render() {
        const columnNames = ['title', 'changes', 'description'];

        const headerCells = columnNames.map((columnName, i) => <GridFieldHeaderCell key={i}>{columnName}</GridFieldHeaderCell>);
        const header = <GridFieldHeader>{headerCells}</GridFieldHeader>;

        const rows = this.mockData.campaigns.map((campaign, i) => {
            const cells = columnNames.map((columnName, i) => {
                return <GridFieldCell key={i}>{campaign[columnName]}</GridFieldCell>
            });
            return <GridFieldRow key={i}>{cells}</GridFieldRow>;
        });

        return (
            <div>
                <NorthHeader />
                <Action text={'Add campaign'} type={'secondary'} icon={'plus-circled'}/>
                <GridField header={header} rows={rows} />
                <Action text={'Save'} type={'success'} icon={'icon-upload'}/>
                <Action text={'Delete'} type={'link'} />

                <div className='btn-group'>
                    <Action text={'Save'} type={'success'} icon={'upload'}/>
                    <Action text={'Publish'} type={'success'} icon={'rocket'}/>
                </div>

                <div className='btn-group'>
                    <Action text={'Saved'} type={'complete'} icon={'tick'}/>
                    <Action text={'Publish'} type={'success'} icon={'rocket'}/>
                </div>

                <Action text={''} type={'success'} icon={'plus'}/>

                <div className='btn-group'>
                    <Action text={'Saved'} type={'complete'} icon={'tick'} />
                    <Action text={'Published'} type={'complete'} icon={'tick'}/>
                </div>

            </div>
        );
    }

}

export default CampaignAdminContainer;
