package com.senac.geekOpolis.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.stereotype.Service;

import com.senac.geekOpolis.models.Cliente;
import com.senac.geekOpolis.models.Endereco;
import com.senac.geekOpolis.models.Frete;
import com.senac.geekOpolis.models.ItemPedido;
import com.senac.geekOpolis.models.Pedido;
import com.senac.geekOpolis.models.PedidoDto;
import com.senac.geekOpolis.models.PedidoRetorno;
import com.senac.geekOpolis.models.ProdutoPedidoDto;
import com.senac.geekOpolis.models.ProdutoPedidoQtDto;
import com.senac.geekOpolis.models.StatusPedido;
import com.senac.geekOpolis.repository.PedidoRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ClienteService clienteService;

    public String incluiPedido(String token, PedidoDto pedidoDto) {
        try {
            Cliente cliente = clienteService.verificarUsuarioPorToken(token);
    
            Pedido pedido = new Pedido();
    
            String codigoPedido = geraCodigoPedido();
            pedido.setCodigoPedido(codigoPedido);
            pedido.setCliente(cliente);
            List<ItemPedido> itens = new ArrayList<>();
            for (ProdutoPedidoQtDto produtoQtDto : pedidoDto.getProdutos()) {
                ProdutoPedidoDto produtoDto = produtoQtDto.getProduto();
                
                ItemPedido itemPedido = new ItemPedido();
                itemPedido.setPedido(pedido);
                itemPedido.setProduto(produtoDto);
                itemPedido.setQuantidade(produtoQtDto.getQuantidade());
                
                itens.add(itemPedido);
            }
    
            pedido.setProdutos(itens);
            Endereco endereco = clienteService.buscaEnderecoPorClienteEId(token, pedidoDto.getEnderecoId());
    
            pedido.setEnderecoDeEntrega(endereco);
            pedido.setMetodoDePagamento(pedidoDto.getMetodoDePagamento());
            pedido.setStatus(StatusPedido.AGUARDANDOPAGAMENTO);
            Frete frete = new Frete();
            frete.setPedido(pedido);
            frete.setTipo(pedidoDto.getFrete().getTipo());
            frete.setValor(pedidoDto.getFrete().getValor());
            pedido.setFrete(frete);
            pedido.setTotal(pedidoDto.getTotal());
    
            pedidoRepository.save(pedido);
    
            return codigoPedido;
        } catch (Exception e) {
            return null;
        }
    }

    private String geraCodigoPedido(){
        String caracteres = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        int lenght = 10;

            StringBuilder randomString = new StringBuilder();
            Random random = new Random();

            for (int i = 0; i < lenght; i++) {
                int randomIndex = random.nextInt(caracteres.length());
                char randomChar = caracteres.charAt(randomIndex);
                randomString.append(randomChar);
            }

            return randomString.toString();
    }

    public List<PedidoRetorno> getPedidosByClienteId(String token) {
        Cliente cliente = clienteService.verificarUsuarioPorToken(token);
        List<Pedido> pedidos = pedidoRepository.findByClienteId(cliente.getId());

        List<PedidoRetorno> retorno = new ArrayList<>();

        for (Pedido pedido : pedidos) {
            PedidoRetorno pRetorno = new PedidoRetorno();

            pRetorno.setDataDoPedido(pedido.getCreatedDate());
            pRetorno.setPedidoCode(pedido.getCodigoPedido());
            pRetorno.setStatus(pedido.getStatus());
            pRetorno.setTotal(pedido.getTotal());

            retorno.add(pRetorno);
        }

        return retorno;
    }
}
