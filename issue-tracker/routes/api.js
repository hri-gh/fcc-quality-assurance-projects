'use strict';
const IssueModel = require('../models/issue.model.js');

module.exports = function (app) {

  app.route('/api/issues/:project')

    .get(async (req, res) => {
      let project = req.params.project;
      const query = { project_name: project, ...req.query };

      try {
        const issues = await IssueModel.find(query).select('-project_name');
        res.json(issues);
      } catch (error) {
        res.status(500).json({ error: 'Could not fetch issues' });
      }

    })

    .post(async (req, res) => {
      let project = req.params.project;
      const { issue_title, issue_text, created_by, assigned_to, status_text } = req.body;

      if (!issue_title || !issue_text || !created_by) {
        return res.json({ error: 'required field(s) missing' });
      }

      const newIssue = new IssueModel({
        project_name: project,
        issue_title,
        issue_text,
        created_by,
        assigned_to: assigned_to || "",
        status_text: status_text || ""
      })
      try {
        const savedIssue = await newIssue.save();
        res.json(savedIssue);
      } catch (err) {
        res.status(500).json({ error: 'Could not save issue' });
      }
    })

    .put(async (req, res) => {
      let project = req.params.project;
      const { _id, ...updates } = req.body;

      if (!_id) {
        return res.json({ error: 'missing _id' });
      }

      if (Object.keys(updates).length === 0) {
        return res.json({ error: 'no update field(s) sent', '_id': _id });
      }

      updates.updated_on = new Date();

      try {
        const updatedIssue = await IssueModel.findByIdAndUpdate(_id, updates, { new: true });
        if (updatedIssue) {
          res.json({ result: 'successfully updated', '_id': _id });
        } else {
          res.json({ error: 'could not update', '_id': _id });
        }
      } catch (err) {
        res.json({ error: 'could not update', '_id': _id });
      }

    })

    .delete(async (req, res) => {
      let project = req.params.project;
      const { _id } = req.body;

      if (!_id) {
        return res.json({ error: 'missing _id' });
      }

      try {
        const deletedIssue = await IssueModel.findByIdAndDelete(_id);
        if (deletedIssue) {
          res.json({ result: 'successfully deleted', '_id': _id });
        } else {
          res.json({ error: 'could not delete', '_id': _id });
        }
      } catch (err) {
        res.json({ error: 'could not delete', '_id': _id });
      }
    });

};
