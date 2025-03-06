const pool = require('../config/db');

class Response {
  static async create(responseData) {
    const { incident_id, type, description, team, start_date, end_date, coordinator_id } = responseData;
    const query = `
      INSERT INTO responses (incident_id, type, description, team, start_date, end_date, coordinator_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [incident_id, type, description, team, start_date, end_date, coordinator_id];
    
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async findAll(filters = {}) {
    let query = `
      SELECT r.*, i.title as incident_title, u.name as coordinator_name 
      FROM responses r 
      LEFT JOIN incidents i ON r.incident_id = i.id 
      LEFT JOIN users u ON r.coordinator_id = u.id
      WHERE 1=1
    `;
    const values = [];
    let valueIndex = 1;

    if (filters.status) {
      query += ` AND r.status = $${valueIndex}`;
      values.push(filters.status);
      valueIndex++;
    }

    if (filters.incident_id) {
      query += ` AND r.incident_id = $${valueIndex}`;
      values.push(filters.incident_id);
      valueIndex++;
    }

    query += ' ORDER BY r.created_at DESC';

    const { rows } = await pool.query(query, values);
    return rows;
  }

  static async findById(id) {
    const query = `
      SELECT r.*, i.title as incident_title, u.name as coordinator_name 
      FROM responses r 
      LEFT JOIN incidents i ON r.incident_id = i.id 
      LEFT JOIN users u ON r.coordinator_id = u.id 
      WHERE r.id = $1;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  static async update(id, updateData) {
    const allowedUpdates = ['type', 'status', 'description', 'team', 'start_date', 'end_date'];
    const updates = Object.entries(updateData)
      .filter(([key]) => allowedUpdates.includes(key))
      .map(([key, value], index) => `${key} = $${index + 2}`);
    
    if (updates.length === 0) return null;

    const query = `
      UPDATE responses 
      SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *;
    `;
    
    const values = [id, ...Object.values(updateData)];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }
}

module.exports = Response;