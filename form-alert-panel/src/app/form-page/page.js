import Container from "@/components/Container";
import InputWithLabel from "@/components/InputWithLabel";
import RoundedButton from "@/components/RoundedButton";

export default function FormPage(){
    return <Container>
            <h1 className="font-medium text-center text-white text-2xl">Informação p/ Submissão</h1>
            <InputWithLabel label="Qual a sala?" />
            <InputWithLabel label="Descreva o problema da sala:" multiline />
            <RoundedButton text="Prosseguir" routeLink="/form-sent" />
        </Container>
}