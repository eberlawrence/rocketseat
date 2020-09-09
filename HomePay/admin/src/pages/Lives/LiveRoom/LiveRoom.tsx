/* eslint-disable no-console */
import React, { useEffect, useState, useCallback, useRef, FormEvent } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import ScrollToBottom, { useScrollToBottom } from "react-scroll-to-bottom";
import { HubConnection, LogLevel, HubConnectionBuilder } from "@microsoft/signalr";
import { RootState } from "store/root-reducer";

import Breadcrumb from "components/Breadcrumb";
import VimeoPlayer from "components/VimeoPlayer";
import { Api } from "services/api";
import Button from "components/Button";
import config from "config";
import { ChatApi } from "services/chatApi";
import { useAuth } from "hooks/auth";
import { UserState } from "store/slices/user";
import ChatMessage from "../components/ChatMessage";

interface ChatMessages {
  id: string;
  body: string;
  createdAt: string;
  username: string;
  displayName: string;
  image: string;
  chatId: string;
}

const LiveRoom: React.FC = () => {
  const { id } = useParams();
  const [live, setLive] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const scrollToBottom = useScrollToBottom();
  const [messages, setMessages] = useState<ChatMessages[]>([]);
  const [hubConnection, setHubConnection] = useState<HubConnection>();
  const { data: userData } = useSelector<RootState, UserState>((state) => state.user);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLive, setIsLive] = useState(true);
  const { hasValidJWT } = useAuth();

  useEffect(() => {
    Api.getLiveEvent(id)
      .then((res) => {
        setLive(res.data.response);
      })
      .catch(() => {
        toast.error("Ocorreu um erro ao buscar os items");
      });

    ChatApi.setBearer(hasValidJWT());
    ChatApi.listOldChatMessages(id)
      .then((res) => {
        const _ = res.data;
        setMessages(_);
      })
      .catch(() => {
        toast.warn("Falha ao carregar mensagens antigas");
      });

    const connection = new HubConnectionBuilder()
      .withUrl(`${config.chatUrl}hubs/chat`, {
        accessTokenFactory: () => hasValidJWT(),
      })
      .configureLogging(LogLevel.Information)
      .build();
    connection
      .start()
      .then(() => {
        if (connection?.state === "Connected") {
          connection?.invoke("AddToGroup", id);
        }
      })
      .catch((err) => toast.error(err));
    connection.on("ReceiveComment", (m) => {
      setMessages((old) => [
        ...old,
        {
          image: m.image,
          body: m.body,
          username: m.username,
          createdAt: m.createdAt,
        } as ChatMessages,
      ]);
    });
    connection.on("Send", (message: any) => {
      console.log(message);
    });
    setHubConnection(connection);
  }, [hasValidJWT, id]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (inputRef.current?.value === "") return;
      hubConnection?.invoke("SendComment", {
        Body: inputRef.current?.value,
        Username: userData.socialName,
        DisplayName: userData.socialName,
        Image: userData.profilePicture,
        ChatId: id,
      });
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      inputRef.current!.value = "";
      scrollToBottom();
    },
    [hubConnection, id, scrollToBottom, userData.profilePicture, userData.socialName],
  );

  const handleEndEvent = useCallback(async () => {
    try {
      setSubmitting(true);
      await Api.endEvent(id);
      setIsLive(false);
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      toast.error(`Ops! Alguma coisa aconteceu de errado`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }, [id]);

  return (
    <>
      <div className="content-body w-100 h-100">
        <Breadcrumb
          title="Transmissões ao vivo"
          description="Gerencie o suas transmissões ao vivo"
          breadcrumb={[
            { text: "Home", link: "/" },
            { text: "Lives", link: "/lives" },
          ]}
        />
        <div className="row tx-14">
          <div className="col-lg-6 col-md-12">
            <div className="embed-responsive embed-responsive-16by9 ">
              {live && (
                <VimeoPlayer title="vimeo-player" src={`https://player.vimeo.com/video/${live?.eventId}`} frameBorder="0" allowFullScreen className="embed-responsive-item " />
              )}
            </div>
            {isLive ? <Button callback={() => handleEndEvent()} wait={submitting} text="Encerrar transmissão" className="btn btn-danger mt-2" /> : <p>Transmissão encerrada!</p>}
          </div>
          <div className="col-lg-6 col-md-12 pr-4 ">
            <div className="card mg-b-20 mg-lg-b-25 ">
              <div className="card-header pd-y-15 pd-x-20 d-flex align-items-center justify-content-between">
                <h6 className="tx-uppercase tx-13 mg-b-0">Live chat</h6>
              </div>
              <ScrollToBottom>
                <div style={{ height: "100vh", maxHeight: "100vh" }} className="card-body pd-25 ">
                  <div className="chat-msg-list ">
                    {messages.map((m) => (
                      <ChatMessage key={uuid()} message={m.body} profilePicture={m.image} username={m.username} createdAt={m.createdAt} />
                    ))}
                  </div>
                </div>
              </ScrollToBottom>
              <div className="card-footer bg-transparent d-flex">
                <form className="flex-fill" onSubmit={(e) => handleSubmit(e)}>
                  <div className="input-group">
                    <input type="text" className="form-control flex-fill" placeholder="Diga olá..." aria-label="Diga olá..." ref={inputRef} />
                    <div className="input-group-append">
                      <button className="btn btn-outline-light" type="submit">
                        Enviar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveRoom;
