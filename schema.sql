INSERT INTO Usuario (nome, grupo, cpf, ativo, email, senha)
VALUES ('Raquel', 'ADMIN', '54131172801', true, 'raquelteixeira502@gmail.com','$2a$12$GfVhD3Rd2aM2h7mto4ffJechh04SXGW3MAR.06hmGd8JGkw0EEBsS');
INSERT INTO Usuario (nome, grupo, cpf, ativo, email, senha)
VALUES ('Raquel', 'ESTOQUISTA', '98569136698', true, 'raquelteixeira51@gmail.com','$2a$12$GfVhD3Rd2aM2h7mto4ffJechh04SXGW3MAR.06hmGd8JGkw0EEBsS');
INSERT INTO Usuario (nome, grupo, cpf, ativo, email, senha)
VALUES ('Endrio', 'ADMIN', '68358788002', true, 'endriojesus76@gmail.com','$2a$12$GfVhD3Rd2aM2h7mto4ffJechh04SXGW3MAR.06hmGd8JGkw0EEBsS');
INSERT INTO Categoria (nome)
VALUES ('Acessorios');
INSERT INTO Categoria (nome)
VALUES ('Roupas');
INSERT INTO Categoria (nome)
VALUES ('Canecas');
INSERT INTO Produto (avaliacao, preco, qtd_estoque, status, categoria_id, code, created_date, descricao, nome, images_path)
VALUES (2.5, 340.0, 60, true, 1, 'CPFUNKONEPIECELUFFY', '21/09/2023', 'De One Piece, Monkey D. Luffy, como um vinil POP estilizado da Funko! O boneco fica em pé de 9 cm e vem em uma caixa de exibição de janela. Inclui um protetor de caixa pop adequado para qualquer investimento de colecionadores.', 'Funk One Piece Luffy', '{"https://i.ibb.co/TYYVmsP/download.jpg", "https://i.ibb.co/PYrQHfz/sdf.jpg"}');