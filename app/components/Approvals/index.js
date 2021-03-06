import React from 'react';
import PropTypes from 'prop-types';
import PendingClaimContainer from '../../containers/PendingClaimContainer';
import { claimsHelpers } from '../../helpers';

const Approvals = ({ props, renderEmptyList, renderError }) => {
  const {claimsMap, claimItemsMap, policies, error, isFetching, employee } = props;

  if (error !== undefined) {
    return renderError(error);
  }

  if (Object.keys(claimsMap).length == 0) {
    return renderEmptyList();
  }

  return (
    <div className="claim-list">
      {Object.entries(claimsMap).map((claim_tuple) => {
        var claim = claim_tuple[1]
        claimsHelpers.calculateTotal(claim, claimItemsMap[claim.id])
          return <PendingClaimContainer
                    claim={claim}
                    employee={employee}
                    key={claim.claim_id}/>
      })}
    </div>
  )
}

Approvals.propTypes = {
}

export default Approvals;