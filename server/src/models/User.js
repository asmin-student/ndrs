const db = require('../config/db');
const { AppError } = require('../utils/errorHandler');

class User {
  static async create(userData) {
    const { name, email, password, role, organization, phone, district } = userData;
    const query = `
      INSERT INTO users (name, email, password, role, organization, phone, district)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, name, email, role, organization, phone, district, created_at;
    `;
    const values = [name, email, password, role, organization, phone, district];
    
    try {
      const { rows } = await db.query(query, values);
      return rows[0];
    } catch (error) {
      if (error.code === '23505') { // Unique violation
        throw new AppError('Email already exists', 400);
      }
      throw error;
    }
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await db.query(query, [email]);
    return rows[0];
  }

  static async findById(id) {
    const query = 'SELECT id, name, email, role, organization, phone, district, created_at FROM users WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }

  static async update(id, updateData) {
    const allowedUpdates = ['name', 'organization', 'phone', 'district'];
    const updates = Object.entries(updateData)
      .filter(([key]) => allowedUpdates.includes(key))
      .map(([key, value], index) => `${key} = $${index + 2}`);
    
    if (updates.length === 0) return null;

    const query = `
      UPDATE users 
      SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING id, name, email, role, organization, phone, district;
    `;
    
    const values = [id, ...Object.values(updateData)];
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }
}

module.exports = User;