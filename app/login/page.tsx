"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import {
  Button,
  Card,
  ColorSwatch,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  Separator,
  TextField,
  toast,
  Typography,
} from "@heroui/react";
import { isAxiosError } from "axios";
import { tostadaFf } from "@/configurations/font.config";
import { AuthenticationInType } from "@/types/authentication.type";
import { AuthenticationInSchema } from "@/schemas/authentication.schema";
import AuthenticationService from "@/services/Authentication.service";
import { useAuthenticationStore } from "@/stores/authentication.store";
import Validator from "@/utilities/Validator.util";

export default function Home() {
  const router = useRouter();

  const setTokens = useAuthenticationStore((state) => state.setTokens);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<AuthenticationInType>({
    email: "",
    password: "",
  });

  const isValidForm = useMemo(() => {
    const result = AuthenticationInSchema.safeParse(credentials);
    return result.success;
  }, [credentials]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await AuthenticationService.login(credentials);
      if (response) {
        const { access_token, refresh_token } = response;
        setTokens(access_token, refresh_token);
        router.replace("/");
      }
    } catch (error: unknown) {
      setCredentials({ email: "", password: "" });

      let detail;

      if (isAxiosError(error)) {
        detail = error.response?.data?.detail;
      } else if (error instanceof Error) {
        detail = error.message;
      } else {
        detail = "Error during login";
      }

      toast.danger(detail);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <Card
        className="max-w-105 w-full mx-auto border-2 border-border-secondary/40 rounded-2xl px-10 mt-18 dark:shadow-[0_0_0_1px_#1f1f20,0_8px_32px_rgba(0,0,0,.55),0_2px_8px_rgba(0,0,0,.3)]"
        variant="tertiary"
      >
        <Card.Header>
          <Typography
            type="h1"
            align="center"
            className={`${tostadaFf.className} py-8`}
          >
            toolbox
          </Typography>

          <Card.Title className="text-2xl mb-2 text-center">
            Bem-vindo ao toolbox
          </Card.Title>

          <Card.Description className="text-center">
            Faça login para acessar sua plataforma
          </Card.Description>
        </Card.Header>

        <Card.Content className="space-y-4 mt-4">
          <Form className="space-y-4" onSubmit={handleSubmit}>
            <TextField
              isRequired
              className="space-y-1"
              type="email"
              value={credentials.email}
              validate={(v) => {
                if (!v.length) {
                  return "Campo obrigatório";
                }
                if (!Validator.email(v)) {
                  return "E-mail inválido";
                }
                return null;
              }}
              onChange={(value) =>
                setCredentials((previous) => ({ ...previous, email: value }))
              }
            >
              <Label className="uppercase">E-mail</Label>

              <Input placeholder="voce@newnet.com.br" />

              <FieldError />
            </TextField>

            <TextField
              isRequired
              className="space-y-1"
              type={isVisible ? "text" : "password"}
              value={credentials.password}
              validate={(value) => {
                if (!value.length) {
                  return "Campo obrigatório";
                }
                if (value.length < 8) {
                  return "Senha muito curta";
                }
                return null;
              }}
              onChange={(value) =>
                setCredentials((previous) => ({ ...previous, password: value }))
              }
            >
              <Label className="uppercase">Senha</Label>

              <InputGroup>
                <InputGroup.Input placeholder="********" />

                <InputGroup.Suffix>
                  {isVisible ? (
                    <FaEyeSlash
                      className="hover:cursor-pointer text-xl"
                      onClick={() => setIsVisible(false)}
                    />
                  ) : (
                    <FaEye
                      className="hover:cursor-pointer text-xl"
                      onClick={() => setIsVisible(true)}
                    />
                  )}
                </InputGroup.Suffix>
              </InputGroup>

              <FieldError />
            </TextField>

            <Button
              type="submit"
              className="mt-4"
              fullWidth
              isDisabled={!isValidForm}
              isPending={isSubmitting}
            >
              {({ isPending }) => <>{isPending ? "Entrando..." : "Entrar"}</>}
            </Button>
          </Form>
        </Card.Content>

        <Card.Footer className="flex flex-col">
          <Separator className="my-4" variant="secondary" />

          <div className="w-full flex items-center gap-x-2">
            <ColorSwatch
              color="#2a5c28"
              className="size-1.5 shadow-[0_0_6px_rgba(74,222,128,.3)]"
            />
            <Typography type="body-xs" color="muted">
              Acesso restrito a colaboradores autorizados
            </Typography>
          </div>
        </Card.Footer>
      </Card>
    </main>
  );
}
