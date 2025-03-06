const pool = require('../config/db');

class Alert {
  static async create(alertData) {
    const { title, type, severity, location, description, issued_by } = alertData;
    const query = `
      INSERT INTO alerts (title, type, severity, location, description, issued_by)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [title, type, severity, location, description, issued_by];
    
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async findAll(filters = {}) {
    let query = `
      SELECT a.*, u.name as issuer_name 
      FROM alerts a 
      LEFT JOIN users u ON a.issued_by = u.id
      WHERE 1=1
    `;
    const values = [];
    let valueIndex = 1;

    if (filters.status) {
      query += ` AND a.status = $${valueIndex}`;
      values.push(filters.status);
      valueIndex++;
    }

    if (filters.severity) {
      query += ` AND a.severity = $${valueIndex}`;
      values.push(filters.severity);
      valueIndex++;
    }

    query += ' ORDER BY a.created_at DESC';

    const { rows } = await pool.query(query, values);
    return rows;
  }

  static async findById(id) {
    const query = `
      SELECT a.*, u.name as issuer_name 
      FROM alerts a 
      LEFT JOIN users u ON a.issued_by = u.id 
      WHERE a.id = $1;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  static async update(id, updateData) {
    const allowedUpdates = ['title', 'type', 'severity', 'location', 'description', 'status'];
    const updates = Object.entries(updateData)
      .filter(([key]) => allowedUpdates.includes(key))
      .map(([key, value], index) => `${key} = $${index + 2}`);
    
    if (updates.length === 0) return null;

    const query = `
      UPDATE alerts 
      SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *;
    `;
    
    const values = [id, ...Object.values(updateData)];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }
}

module.exports = Alert;