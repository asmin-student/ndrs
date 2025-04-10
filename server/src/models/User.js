const { pool } = require('../config/db');
const { AppError } = require('../utils/errorHandler');

class User {
  static async create(userData) {
    const {
      name,
      email,
      password,
      role,
      organization,
      phone,
      district,
      profile_picture
    } = userData;

    const query = `
      INSERT INTO users (
        name, 
        email, 
        password, 
        role, 
        organization, 
        phone, 
        district,
        profile_picture
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING 
        id, 
        name, 
        email, 
        role, 
        organization, 
        phone, 
        district, 
        created_at;
    `;

    const values = [
      name,
      email,
      password,
      role,
      organization || null,
      phone,
      district,
      profile_picture ? Buffer.from(profile_picture.split(',')[1], 'base64') : null
    ];

    try {
      const { rows } = await pool.query(query, values);
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
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  }

  static async findById(id) {
    const query = `
      SELECT id, name, email, role, organization, phone, district, profile_picture, created_at
      FROM users 
      WHERE id = $1
    `;

    try {
      const { rows } = await pool.query(query, [id]);
      if (rows.length === 0) return null;

      const user = rows[0];

      // Convert Buffer back to base64 string if exists
      if (user.profile_picture) {
        user.profile_picture = `data:image/jpeg;base64,${user.profile_picture.toString('base64')}`;
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, updateData) {
    const allowedUpdates = ['name', 'organization', 'phone', 'district'];
    const updates = [];
    const values = [id]; // Start with ID as first parameter ($1)

    // Filter and collect allowed fields
    Object.entries(updateData).forEach(([key, value]) => {
      if (allowedUpdates.includes(key)) {
        updates.push(`${key} = $${values.length + 1}`); // Dynamic parameter index
        values.push(value);
      }
    });

    if (updates.length === 0) return null;

    const query = `
      UPDATE users 
      SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING id, name, email, role, organization, phone, district;
    `;

    const { rows } = await pool.query(query, values);
    return rows[0];
  }
}

module.exports = User;