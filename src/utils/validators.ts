import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const validateUserRegistration = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const validateUserLogin = [
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

const validateEventCreation = [
  body('name').notEmpty().withMessage('Event name is required'),
  body('date').isISO8601().withMessage('Date must be a valid date'),
  body('time').notEmpty().withMessage('Time is required'),
  body('venue').notEmpty().withMessage('Venue is required'),
  body('tickets').isArray({ min: 1 }).withMessage('At least one ticket category is required'),
  body('tickets.*.category').notEmpty().withMessage('Ticket category is required'),
  body('tickets.*.price').isFloat({ gt: 0 }).withMessage('Ticket price must be greater than 0'),
  body('tickets.*.availability').isInt({ gt: 0 }).withMessage('Ticket availability must be greater than 0'),
];

const validatePurchaseTicket = [
  body('eventId').notEmpty().withMessage('Event ID is required'),
  body('category').notEmpty().withMessage('Ticket category is required'),
  body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be greater than 0'),
];

const validateObjectId = [
  param('id').isMongoId().withMessage('Invalid ID format'),
];

const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export {
  validateUserRegistration,
  validateUserLogin,
  validateEventCreation,
  validatePurchaseTicket,
  validateObjectId,
  handleValidationErrors,
};
