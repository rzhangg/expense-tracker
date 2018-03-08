var connection = require('../config/connect');

module.exports = {
  findAllWithEmployee: function(employee) {
    return new Promise((resolve, reject) => {
      var queryString = `SELECT 
                            claim.id as claim_id, 
                            claimee.first_name as claimee_first_name,
                            claimee.last_name as claimee_last_name, 
                            claimee.email as claimee_email,
                            approver.first_name as approver_first_name,
                            approver.last_name as approver_last_name, 
                            approver.email as approver_email,
                            company.name as company_name,
                            claim.cost_centre_id,
                            claim.account_number,
                            claim.description, 
                            claim.notes,
                            claim.status, 
                            claim.date_created,
                            manager.id as manager_id,
                            manager.first_name as manager_first_name,
                            manager.last_name as manager_last_name,
                            manager.email as manager_email
                           FROM
                            claim, 
                            employee claimee, 
                            employee approver,
                            employee manager,
                            company
                           WHERE 
                            claimee.id = claim.claimee_id AND 
                            approver.id = claim.approver_id AND
                            claimee.manager_id = manager.id AND
                            claim.company_id = company.id AND
                            claimee.email = ?`;
      connection.query(queryString, [employee.email], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  findAllWithParams: function(params, employee) {
    return new Promise((resolve, reject) => {
      // build params
      var whereArray = [];
      var orArray = [];

      for (key in params) {
        if (params[key].length > 0) {
           switch(key) {
            case "employee_id":
              whereArray.push("claimee.id = '" + params[key] + "'")
              break;
            case "manager_id":
              whereArray.push("manager.id = '" + params[key] + "'")
              break;
            case "employee_first_name":
              whereArray.push("claimee.first_name LIKE '" + params[key] + "%'");
              break;
            case "employee_last_name":
              whereArray.push("claimee.last_name LIKE '" + params[key] + "%'");
              break;
            case "employee_email":
              whereArray.push("claimee.email LIKE '%" + params[key] + "%'");
              break;
            case "manager_first_name":
              whereArray.push("manager.first_name LIKE '" + params[key] + "%'");
              break;
            case "manager_last_name":
              whereArray.push("manager.last_name LIKE '" + params[key] + "%'");
              break;
            case "manager_email":
              whereArray.push("claimee.email LIKE '" + params[key] + "%'");
              break;
            case "submitted":
              orArray.push("claim.status = " + "'S'")
              break;
            case "approved":
              if (params[key] === 'true') {
                orArray.push("claim.status = " + "'A'")
              } else {
                whereArray.push("claim.status != " + "'A'")
              }
              break;
            case "declined":
              if (params[key] === 'true') {
                orArray.push("claim.status = " + "'D'")
              } else {
                whereArray.push("claim.status != " + "'D'")
              }
              break;
            case "pending":
              if (params[key] === 'true') {
                orArray.push("claim.status = 'S' OR claim.status = 'F'")
              } else {
                whereArray.push("claim.status != 'S' AND claim.status != 'F'")
              }
              break;
            case "drafts":
              if (params[key] === 'true') {
                orArray.push("claim.status = " + "'P'")
              } else {
                whereArray.push("claim.status != " + "'P'")
              }
            case "start":
              if (params["end"].length > 0) {
                whereArray.push("claim.date_created BETWEEN '" + params["start"] + "' AND '" + params["end"] + "'")
              }
              break;
            case "end":
              if (params["start"].length > 0) {
                whereArray.push("claim.date_created BETWEEN '" + params["start"] + "' AND '" + params["end"] + "'")
              }
              break;
            default:
              break;
           }
        }
      }

      var orString = orArray.length > 0 ? (" AND (" + orArray.join(" OR ") + ")" ) : ""; 
      var whereString = whereArray.length > 0 ? " AND " + whereArray.join(" AND ") : "";
      whereString += orString;

      var queryString = `SELECT 
                            claim.id as claim_id, 
                            claimee.first_name as claimee_first_name,
                            claimee.last_name as claimee_last_name, 
                            claimee.email as claimee_email,
                            approver.first_name as approver_first_name,
                            approver.last_name as approver_last_name, 
                            approver.email as approver_email,
                            company.name as company_name,
                            claim.cost_centre_id,
                            claim.account_number,
                            claim.description, 
                            claim.notes,
                            claim.status, 
                            claim.date_created,
                            manager.id as manager_id,
                            manager.first_name as manager_first_name,
                            manager.last_name as manager_last_name,
                            manager.email as manager_email
                           FROM
                            claim, 
                            employee claimee, 
                            employee approver,
                            employee manager,
                            company
                           WHERE 
                            claimee.id = claim.claimee_id AND 
                            approver.id = claim.approver_id AND
                            claimee.manager_id = manager.id AND
                            approver.id = ? AND
                            claim.company_id = company.id` + whereString + ";"
      connection.query(queryString, [employee.id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  findOneWithClaimID: function(claim_id) {
    return new Promise((resolve, reject) => {
      var queryString = `SELECT 
                            claim.id as claim_id, 
                            claimee.first_name as claimee_first_name,
                            claimee.last_name as claimee_last_name, 
                            claimee.email as claimee_email,
                            approver.first_name as approver_first_name,
                            approver.last_name as approver_last_name, 
                            approver.email as approver_email,
                            company.name as company_name,
                            claim.cost_centre_id,
                            claim.account_number,
                            claim.description, 
                            claim.notes,
                            claim.status, 
                            claim.date_created,
                            manager.id as manager_id,
                            manager.first_name as manager_first_name,
                            manager.last_name as manager_last_name,
                            manager.email as manager_email
                           FROM
                            claim, 
                            employee claimee, 
                            employee approver,
                            employee manager,
                            company
                           WHERE 
                            claimee.id = claim.claimee_id AND 
                            approver.id = claim.approver_id AND
                            claim.company_id = company.id AND
                            claimee.manager_id = manager.id AND
                            claim.id = ?`;
      connection.query(queryString, [claim_id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  findPendingApprovalsByManager: function(employee) {
    return new Promise((resolve, reject) => {
      var queryString = `SELECT 
                          claim.id as claim_id, 
                          claimee.first_name as claimee_first_name,
                          claimee.last_name as claimee_last_name, 
                          claimee.email as claimee_email,
                          approver.first_name as approver_first_name,
                          approver.last_name as approver_last_name, 
                          approver.email as approver_email,
                          company.name as company_name,
                          claim.cost_centre_id,
                          claim.account_number,
                          claim.description, 
                          claim.notes,
                          claim.status, 
                          claim.date_created
                        FROM
                          claim, 
                          employee claimee, 
                          employee approver,
                          company
                        WHERE 
                          claimee.id = claim.claimee_id AND 
                          approver.id = claim.approver_id AND
                          claim.company_id = company.id AND
                          (claim.status = 'S' OR claim.status = 'F') AND
                          approver.id = ?`;
      connection.query(queryString, [employee.id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  findProcessedApprovalsByManager: function(employee) {
    return new Promise((resolve, reject) => {
      var queryString = `SELECT 
                          claim.id as claim_id, 
                          claimee.first_name as claimee_first_name,
                          claimee.last_name as claimee_last_name, 
                          claimee.email as claimee_email,
                          approver.first_name as approver_first_name,
                          approver.last_name as approver_last_name, 
                          approver.email as approver_email,
                          company.name as company_name,
                          claim.cost_centre_id,
                          claim.account_number,
                          claim.description, 
                          claim.notes,
                          claim.status, 
                          claim.date_created,
                          manager.id as manager_id,
                          manager.first_name as manager_first_name,
                          manager.last_name as manager_last_name,
                          manager.email as manager_email
                        FROM
                          claim, 
                          employee claimee, 
                          employee approver,
                          employee manager,
                          company
                        WHERE 
                          claimee.id = claim.claimee_id AND 
                          approver.id = claim.approver_id AND
                          claim.company_id = company.id AND
                          claimee.manager_id = manager.id AND
                          (claim.status = 'A' OR claim.status = 'D') AND
                          approver.id = ?`;
      connection.query(queryString, [employee.id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  updateStatus: function(claim_id, approver_id, status, notes) {
    return new Promise((resolve, reject) => {
      var queryString = `UPDATE claim
                          SET 
                            claim.approver_id = ?,
                            claim.status = ?,
                            claim.notes = ?,
                            claim.date_modified = NOW()
                          WHERE 
                            claim.id = ?`;
      connection.query(queryString, [approver_id, status, notes, claim_id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  findOne: function(id) {
    return new Promise((resolve, reject) => {
      //TODO queryString to fetch all employee claims with id
    });
  },

  addOne: function(claim) {
    return new Promise((resolve, reject) => {
      const queryString = 
                          `INSERT INTO claim
                            (claimee_id,
                             approver_id,
                             company_id,
                             cost_centre_id,
                             description,
                             account_number,
                             notes,
                             status,
                             date_created,
                             date_modified)
                           VALUES
                            (?, ?, ?, ?, ?, ?, NULL, ?, NOW(), NOW())`;
      connection.query(queryString, 
      [
        claim.claimee_id,
        claim.approver_id,
        claim.company_id,
        claim.cost_centre_id,
        claim.description,
        claim.account_number,
        claim.status
      ]
      , (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    }); 
  },

  updateOne: function(claim) {
    return new Promise((resolve, reject) => {
      //TODO queryString to update one claim
    }); 
  },

  deleteOne: function(claim_id) {
    return new Promise((resolve, reject) => {
      const queryString = `DELETE FROM claim WHERE id = ?`;
      connection.query(queryString, 
      [
        claim_id
      ]
      , (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    }); 
  }
}
