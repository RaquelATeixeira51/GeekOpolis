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
INSERT INTO Produto (
  AVALIACAO, PRECO, QTD_ESTOQUE, STATUS, 
  CATEGORIA_ID, ID, CODE, CREATED_DATE, 
  DESCRICAO, NOME, IMAGES_PATH
) VALUES (
  2.5, 340.0, 60, TRUE, 1, 1, 'CPFUNKONEPIECELUFFY', 
  '2023-09-21', 'De One Piece, Monkey D. Luffy, como um vinil POP estilizado da Funko! O boneco fica em pé de 9 cm e vem em uma caixa de exibição de janela. Inclui um protetor de caixa pop adequado para qualquer investimento de colecionadores.', 
  'Funko One Piece Luffy', 'https://i.ibb.co/TYYVmsP/download.jpg, https://i.ibb.co/PYrQHfz/sdf.jpg'
), (
  4.5, 199.99, 65, TRUE, 1, 2, 'CPFUNKOPOPPOKMONPIKACHU', 
  '2023-11-06', 'Sempre que Pikachu se depara com algo novo, ele explode com um choque de eletricidade. Se você se deparar com uma fruta enegrecida, é uma evidência de que este Pokémon confundiu a intensidade de sua carga.', 
  'Funko Pop Pokémon Pikachu', 'https://i.ibb.co/0V4z4t3/pikachu1.jpg, https://i.ibb.co/7XqZxSM/pikachu2.webp'
), (
  4.5, 49.99, 98, TRUE, 1, 3, 'CPKIT2PINSSTRANGERTHINGSDUSTINDEMOGORGON', 
  '2023-11-06', 'O Kit 2 Pins Stranger Things - Dustin e Demogorgon é um produto original e licenciado, exclusivo Piticas. Produção nacional, feito em Zamac e Metal, prezamos pela qualidade e diversidade. Use e Colecione, expresse todo o seu lado fã.', 
  'KIT 2 PINS STRANGER THINGS - DUSTIN DEMOGORGON', 
  'https://i.ibb.co/LP7PdYZ/kitpin1.webp, https://i.ibb.co/Q620NFS/kitpin2.webp, https://i.ibb.co/JzmzPfS/kitpin3.webp'
), (
  5.0, 39.9, 65, TRUE, 1, 4, 'CPCHAVEIROSTRANGERTHINGSELEVEN', 
  '2023-11-06', 'O Chaveiro Stranger Things Eleven é um produto original, licenciado e exclusivo Piticas. Produção nacional, feito em Zamac e Metal, prezamos pela qualidade e diversidade. Use e Colecione, expresse todo o seu lado fã.', 
  'CHAVEIRO STRANGER THINGS ELEVEN', 
  'https://i.ibb.co/KzG68LB/chaveiro.webp'
), (
  3.5, 229.9, 345, TRUE, 1, 5, 'CPBOLSAREDONDAMULHERMARAVILHA', 
  '2023-11-06', 'A Bolsa Redonda Mulher Maravilha Logo é um produto original, licenciado e exclusivo Piticas. Estampa inspirada na franquia, contendo toda autenticidade e a magia que os fãs dessa saga tanto procuram.', 
  'BOLSA REDONDA MULHER MARAVILHA', 
  'https://i.ibb.co/jWhRZtb/bolsa1.png, https://i.ibb.co/6nj6Rks/bolsa2.png'
), (
  4.0, 36.99, 231, TRUE, 1, 17, 'CPCHAVEIROCORDOBATMANRIDDLER', 
  '2023-11-06', 'O Chaveiro Cordão Batman Riddler é um produto original e licenciado, exclusivo Piticas. Confeccionado em 100% poliéster Premium de alta qualidade com tratamento para maior resistência com impressão digital/sublimação de alta definição.', 
  'CHAVEIRO CORDÃO BATMAN RIDDLER', 
  'https://i.ibb.co/vVyJqYF/chaveirocharada1.webp, https://i.ibb.co/rdfhMgg/chaveirocharada2.webp'
);