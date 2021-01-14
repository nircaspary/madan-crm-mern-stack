const Fault = require('../models/faultsModel');
const express = require('express');
const app = express();

exports.getAllFaults = async (req, res) => {
  try {
    const fault = await Fault.find();
    res.status(200).json({
      status: 'succses',
      data: {
        fault,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.createFault = async (req, res) => {
  try {
    const newFault = await Fault.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        fault: newFault,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.findFault = async (req, res) => {
  try {
    const fault = await Fault.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        fault,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.updateFault = async (req, res) => {
  try {
    const fault = await Fault.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        fault,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deleteFault = async (req, res) => {
  try {
    const fault = await Fault.findOneAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
