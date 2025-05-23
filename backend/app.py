from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from pathlib import Path
import hashlib

app = Flask(__name__)
CORS(app)  # Habilita CORS

# Configuração do arquivo JSON
ARQUIVO_USUARIOS = Path('database/usuarios.json')

def carregar_usuarios():
    if not ARQUIVO_USUARIOS.exists():
        ARQUIVO_USUARIOS.parent.mkdir(parents=True, exist_ok=True)
        with open(ARQUIVO_USUARIOS, 'w') as f:
            json.dump([], f)
        return []
    
    with open(ARQUIVO_USUARIOS, 'r') as f:
        return json.load(f)

def salvar_usuarios(usuarios):
    with open(ARQUIVO_USUARIOS, 'w') as f:
        json.dump(usuarios, f, indent=2)

def hash_senha(senha):
    return hashlib.sha256(senha.encode()).hexdigest()

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if not data or 'email' not in data or 'password' not in data or 'name' not in data:
        return jsonify({'success': False, 'message': 'Dados incompletos'}), 400
    
    usuarios = carregar_usuarios()
    
    if any(u['email'] == data['email'] for u in usuarios):
        return jsonify({'success': False, 'message': 'Email já cadastrado'}), 409 
    
    usuarios.append({
        'name': data['name'],
        'email': data['email'],
        'password': hash_senha(data['password'])
    })
    
    salvar_usuarios(usuarios)
    return jsonify({'success': True, 'message': 'Registro bem-sucedido'})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({'success': False, 'message': 'Dados incompletos'}), 400
    
    usuarios = carregar_usuarios()
    senha_hash = hash_senha(data['password'])
    
    usuario = next((u for u in usuarios if u['email'] == data['email'] and u['password'] == senha_hash), None)
    
    if not usuario:
        return jsonify({'success': False, 'message': 'Credenciais inválidas'}), 401
    
    return jsonify({
        'success': True,
        'user': {
            'name': usuario['name'],
            'email': usuario['email']
        }
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)