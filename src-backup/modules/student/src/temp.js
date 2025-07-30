import React, { useState, useEffect, useContext, useRef } from "react";
import { Row, Col, FormControl, Modal, Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "./UserContext";

const Chat = () => {
    const {
        userData,
        user,
        getUserChats,
        sendMessage,
        subscribeToMessages,
        subscribeToUserChats,
        markMessagesAsRead,
        searchUsers,
        createChat,
        deleteMessage
    } = useContext(UserContext);

    const [chats, setChats] = useState([]);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showNewChatModal, setShowNewChatModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [currentChatId, setCurrentChatId] = useState(null);
    const [chatStats, setChatStats] = useState(null);

    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 786);
    const [showChatOnMobile, setShowChatOnMobile] = useState(false);

    const messagesEndRef = useRef(null);
    const unsubscribeChats = useRef(null);
    const unsubscribeMessages = useRef(null);
    const markAsReadTimeoutRef = useRef(null);
    const lastReadChatId = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 786;
            setIsMobileView(mobile);
            if (!mobile) {
                setShowChatOnMobile(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (user) {
            loadChats();
        }
    }, [user]);

    useEffect(() => {
        return () => {
            if (unsubscribeChats.current) {
                unsubscribeChats.current();
            }
            if (unsubscribeMessages.current) {
                unsubscribeMessages.current();
            }
            if (markAsReadTimeoutRef.current) {
                clearTimeout(markAsReadTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (selectedChatId && selectedChatId === currentChatId) {
            console.log('Loading messages for chat:', selectedChatId);
            const timeoutId = setTimeout(() => {
                loadMessages(selectedChatId);
            }, 50);
    
            return () => clearTimeout(timeoutId);
        } else if (!selectedChatId) {
            setMessages([]);
            setIsLoadingMessages(false);
        }
    }, [selectedChatId, currentChatId]);

    const loadChats = async () => {
        try {
            setLoading(true);

            unsubscribeChats.current = subscribeToUserChats((chatsData) => {
                setChats(chatsData);
                setLoading(false);
            });

        } catch (error) {
            console.error('Error loading chats:', error);
            setLoading(false);
        }
    };

    const loadMessages = (chatId) => {
        if (!chatId) {
            setMessages([]);
            return;
        }
    
        setIsLoadingMessages(true);
    
        if (unsubscribeMessages.current) {
            unsubscribeMessages.current();
        }
    
        let hasReceivedData = false;
    
        unsubscribeMessages.current = subscribeToMessages(chatId, (messagesData) => {
            console.log('Messages received:', messagesData, 'Type:', typeof messagesData, 'Length:', messagesData?.length);
    
            if (messagesData !== undefined && messagesData !== null && Array.isArray(messagesData)) {
                if (!hasReceivedData || messagesData.length > 0) {
                    hasReceivedData = true;
                    setMessages(messagesData);
                    setIsLoadingMessages(false);
    
                    setTimeout(() => scrollToBottom(), 100);
    
                    if (chatId !== lastReadChatId.current) {
                        lastReadChatId.current = chatId;
    
                        if (markAsReadTimeoutRef.current) {
                            clearTimeout(markAsReadTimeoutRef.current);
                        }
    
                        markAsReadTimeoutRef.current = setTimeout(() => {
                            markMessagesAsRead(chatId);
                        }, 1000);
                    }
                } else {
                    setIsLoadingMessages(false);
                    console.log('Ignoring empty array - keeping existing messages');
                }
            }
        });
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleChatSelect = (chatId) => {
        if (selectedChatId === chatId) return;
        
        console.log('Selecting chat:', chatId);
        setCurrentChatId(chatId);
        setSelectedChatId(chatId);
        
        if (isMobileView) {
            setShowChatOnMobile(true);
        }
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !selectedChatId) return;

        const messageText = newMessage.trim();
        setNewMessage("");

        try {
            const result = await sendMessage(selectedChatId, messageText);
            if (!result.success) {
                console.error('Error sending message:', result.error);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleSearch = async (term) => {
        setSearchTerm(term);

        if (term.trim().length < 2) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        try {
            const result = await searchUsers(term);
            if (result.success) {
                setSearchResults(result.data);
            }
        } catch (error) {
            console.error('Error searching users:', error);
        } finally {
            setIsSearching(false);
        }
    };

    const handleStartChat = async (userId) => {
        try {
            const result = await createChat(userId);
            if (result.success) {
                setShowNewChatModal(false);
                setSearchTerm("");
                setSearchResults([]);
                handleChatSelect(result.chatId);
            }
        } catch (error) {
            console.error('Error starting chat:', error);
        }
    };

    const selectedChat = chats.find(chat => chat.id === selectedChatId);

    const formatTime = (timestamp) => {
        if (!timestamp) return '';

        let date;
        if (timestamp.toDate) {
            date = timestamp.toDate();
        } else if (timestamp instanceof Date) {
            date = timestamp;
        } else {
            date = new Date(timestamp);
        }

        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} min`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''}`;

        return date.toLocaleDateString();
    };

    const formatMessageTime = (timestamp) => {
        if (!timestamp) return '';

        let date;
        if (timestamp.toDate) {
            date = timestamp.toDate();
        } else if (timestamp instanceof Date) {
            date = timestamp;
        } else {
            date = new Date(timestamp);
        }

        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="chat-container">
            <Row className="w-100 m-0 h-100">
                {/* Sidebar */}
                {(!isMobileView || !showChatOnMobile) && (
                    <Col xs={12} md={4} className="chat-sidebar">
                        <div className="sidebar-header">
                            <img
                                src={userData?.avatar || "/assets/Avatar4.png"}
                                alt="Avatar"
                                className="user-avatar"
                            />
                            <div className="search-container">
                                <img
                                    src="/assets/Adornment.png"
                                    alt="Search"
                                    className="search-icon"
                                />
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Search chats..."
                                    value={searchTerm}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                            </div>
                            <button
                                className="new-chat-btn"
                                onClick={() => setShowNewChatModal(true)}
                            >
                                +
                            </button>
                        </div>

                        {loading ? (
                            <div className="loading-container">
                                <Spinner animation="border" size="sm" />
                                <span>Loading chats...</span>
                            </div>
                        ) : (
                            <>
                                <div className="chats-header">Recent Chats</div>
                                <div className="chats-list">
                                    {chats.map(chat => (
                                        <div
                                            key={chat.id}
                                            className={`chat-item ${selectedChatId === chat.id ? 'active' : ''}`}
                                            onClick={() => handleChatSelect(chat.id)}
                                        >
                                            <div className="chat-avatar-container">
                                                <img
                                                    src={chat.otherUser.avatar || "/assets/Avatar5.png"}
                                                    alt="Avatar"
                                                    className="chat-avatar"
                                                />
                                                <div className="online-badge"></div>
                                            </div>
                                            <div className="chat-info">
                                                <div className="chat-name">
                                                    {chat.otherUser.name || chat.otherUser.email}
                                                </div>
                                                <div className="chat-last-message">
                                                    {chat.lastMessage?.text || "No messages yet"}
                                                </div>
                                            </div>
                                            <div className="chat-time-container">
                                                <div className="chat-time">
                                                    {formatTime(chat.lastMessage?.timestamp)}
                                                </div>
                                                {chat.unreadCount > 0 && (
                                                    <div className="unread-badge">
                                                        {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {chats.length === 0 && (
                                        <div className="empty-state">
                                            <p>No chats yet. Start a new conversation!</p>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </Col>
                )}

                {/* Chat Window */}
                {(!isMobileView || showChatOnMobile) && (
                    <Col xs={12} md={8} className="chat-window">
                        {selectedChat ? (
                            <>
                                {/* Header */}
                                <div className="chat-header">
                                    <div className="chat-header-left">
                                        {isMobileView && (
                                            <img
                                                src="/assets/arrow-left.png"
                                                alt="Back"
                                                className="back-btn"
                                                onClick={() => setShowChatOnMobile(false)}
                                            />
                                        )}
                                        <div className="header-avatar-container">
                                            <img
                                                src={selectedChat.otherUser.avatar || "/assets/Avatar3.png"}
                                                alt="Avatar"
                                                className="header-avatar"
                                            />
                                            <div className="online-badge"></div>
                                        </div>
                                        <div className="header-info">
                                            <div className="header-name">
                                                {selectedChat.otherUser.name || selectedChat.otherUser.email}
                                            </div>
                                            <div className="header-status">
                                                {selectedChat.totalMessages > 0 && (
                                                    <span className="message-count">
                                                        {selectedChat.totalMessages} messages
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chat-header-right">
                                        <img
                                            src="/assets/Search3.png"
                                            alt="Search"
                                            className="header-icon"
                                        />
                                        <img
                                            src="/assets/MoreVert.png"
                                            alt="Menu"
                                            className="header-icon"
                                        />
                                    </div>
                                </div>

                                {/* Messages */}
                                <div className="messages-container">
                                    {isLoadingMessages ? (
                                        <div className="loading-container">
                                            <Spinner animation="border" size="sm" />
                                            <span>Loading messages...</span>
                                        </div>
                                    ) : (
                                        <>
                                            {(!messages || messages.length === 0) ? (
                                                <div className="no-messages-container">
                                                    <div className="no-messages-icon">💬</div>
                                                    <h4>No messages yet</h4>
                                                    <p>Start the conversation with {selectedChat.otherUser.name || selectedChat.otherUser.email}</p>
                                                </div>
                                            ) : (
                                                messages.map(msg => (
                                                    <div
                                                        key={msg.id}
                                                        className={`message ${msg.senderId === user.uid ? 'sent' : 'received'}`}
                                                    >
                                                        {msg.senderId !== user.uid && (
                                                            <img
                                                                src={msg.senderAvatar || "/assets/Avatar3.png"}
                                                                alt="Avatar"
                                                                className="message-avatar"
                                                            />
                                                        )}
                                                        <div className="message-content">
                                                            <div className={`message-bubble ${msg.deleted ? 'deleted' : ''}`}>
                                                                {msg.deleted ? (
                                                                    <em>This message was deleted</em>
                                                                ) : (
                                                                    msg.text
                                                                )}
                                                            </div>
                                                            <div className="message-time">
                                                                {formatMessageTime(msg.timestamp)}
                                                            </div>
                                                        </div>
                                                        {msg.senderId === user.uid && (
                                                            <img
                                                                src={userData?.profile_pic || "/assets/Avatar6.png"}
                                                                alt="Avatar"
                                                                className="message-avatar"
                                                            />
                                                        )}
                                                    </div>
                                                ))
                                            )}
                                            <div ref={messagesEndRef} />
                                        </>
                                    )}
                                </div>

                                {/* Input Section */}
                                <div className="message-input-container">
                                    <FormControl
                                        placeholder="Type your message here..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        className="message-input"
                                    />
                                    <img
                                        src="/assets/AttachFile.png"
                                        alt="Attach"
                                        className="input-icon"
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!newMessage.trim()}
                                        className="send-btn"
                                    >
                                        SEND
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="no-chat-selected">
                                <div className="no-chat-icon">💭</div>
                                <h3>Select a chat to start messaging</h3>
                                <p>Choose from your existing conversations or start a new one</p>
                            </div>
                        )}
                    </Col>
                )}
            </Row>

            {/* New Chat Modal */}
            <Modal show={showNewChatModal} onHide={() => setShowNewChatModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Start New Chat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl
                        placeholder="Search users by name or email..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="mb-3"
                    />

                    {isSearching ? (
                        <div className="loading-container">
                            <Spinner animation="border" size="sm" />
                            <span>Searching...</span>
                        </div>
                    ) : (
                        <div className="search-results">
                            {searchResults.map(user => (
                                <div
                                    key={user.id}
                                    className="search-result-item"
                                    onClick={() => handleStartChat(user.id)}
                                >
                                    <img
                                        src={user.avatar || "/assets/Avatar5.png"}
                                        alt="Avatar"
                                        className="search-avatar"
                                    />
                                    <div className="search-info">
                                        <div className="search-name">{user.name || user.email}</div>
                                        <div className="search-email">{user.email}</div>
                                    </div>
                                </div>
                            ))}

                            {searchTerm && searchResults.length === 0 && !isSearching && (
                                <p>No users found</p>
                            )}
                        </div>
                    )}
                </Modal.Body>
            </Modal>

            {/* Styles */}
            <style jsx>{`
                .chat-container {
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #f8fafc;
                }

                .chat-sidebar {
                    background-color: #ffffff;
                    padding: 24px;
                    height: 100vh;
                    overflow-y: auto;
                    border-right: 1px solid #e5e7eb;
                }

                .sidebar-header {
                    display: flex;
                    align-items: center;
                    margin-bottom: 24px;
                    gap: 12px;
                }

                .user-avatar {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid #e5e7eb;
                }

                .search-container {
                    flex: 1;
                    position: relative;
                }

                .search-icon {
                    position: absolute;
                    left: 14px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 18px;
                    height: 18px;
                    z-index: 2;
                }

                .search-input {
                    width: 100%;
                    padding: 12px 16px 12px 44px;
                    border-radius: 12px;
                    border: 1px solid #d1d5db;
                    font-size: 14px;
                    outline: none;
                    background-color: #f9fafb;
                    transition: all 0.2s ease;
                }

                .search-input:focus {
                    border-color: #101828;
                    background-color: #ffffff;
                    box-shadow: 0 0 0 3px rgba(16, 24, 40, 0.1);
                }

                .new-chat-btn {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #101828 0%, #374151 100%);
                    color: white;
                    border: none;
                    font-size: 18px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                    box-shadow: 0 4px 12px rgba(16, 24, 40, 0.15);
                }

                .new-chat-btn:hover {
                    background: linear-gradient(135deg, #374151 0%, #4b5563 100%);
                    transform: translateY(-1px);
                    box-shadow: 0 6px 20px rgba(16, 24, 40, 0.25);
                }

                .chats-header {
                    font-size: 14px;
                    font-weight: 600;
                    color: #374151;
                    margin-bottom: 16px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .chats-list {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .chat-item {
                    display: flex;
                    align-items: center;
                    padding: 16px 12px;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    border: 1px solid transparent;
                }

                .chat-item:hover {
                    background-color: #f9fafb;
                    border-color: #e5e7eb;
                }

                .chat-item.active {
                    background: linear-gradient(135deg, #101828 0%, #374151 100%);
                    color: white;
                    border-color: #101828;
                    box-shadow: 0 4px 12px rgba(16, 24, 40, 0.15);
                }

                .chat-avatar-container {
                    position: relative;
                    margin-right: 12px;
                }

                .chat-avatar {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid #e5e7eb;
                }

                .chat-item.active .chat-avatar {
                    border-color: rgba(255, 255, 255, 0.3);
                }

                .online-badge {
                    position: absolute;
                    bottom: 2px;
                    right: 2px;
                    width: 12px;
                    height: 12px;
                    background-color: #22c55e;
                    border: 2px solid white;
                    border-radius: 50%;
                }

                .chat-info {
                    flex: 1;
                    min-width: 0;
                }

                .chat-name {
                    font-weight: 600;
                    font-size: 15px;
                    margin-bottom: 4px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: #101828;
                }

                .chat-item.active .chat-name {
                    color: white;
                }

                .chat-last-message {
                    font-size: 13px;
                    color: #6b7280;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-weight: 400;
                }

                .chat-item.active .chat-last-message {
                    color: rgba(255, 255, 255, 0.8);
                }

                .chat-time-container {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 6px;
                    margin-left: 8px;
                    flex-shrink: 0;
                }

                .chat-time {
                    font-size: 11px;
                    color: #9ca3af;
                    flex-shrink: 0;
                    font-weight: 500;
                }

                .chat-item.active .chat-time {
                    color: rgba(255, 255, 255, 0.7);
                }

                .unread-badge {
                    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                    color: white;
                    border-radius: 10px;
                    font-size: 10px;
                    font-weight: 700;
                    padding: 3px 7px;
                    min-width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
                }

                .chat-item.active .unread-badge {
                    background: linear-gradient(135deg, #f87171 0%, #ef4444 100%);
                }

                .message-count {
                    font-size: 12px;
                    color: #6b7280;
                    font-weight: 400;
                }

                .chat-window {
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    background-color: #ffffff;
                }

                .chat-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px 24px;
                    border-bottom: 1px solid #e5e7eb;
                    background-color: #ffffff;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    z-index: 10;
                }

                .chat-header-left {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                .back-btn {
                    width: 24px;
                    height: 24px;
                    cursor: pointer;
                    transition: transform 0.2s ease;
                }

                .back-btn:hover {
                    transform: translateX(-2px);
                }

                .header-avatar-container {
                    position: relative;
                }

                .header-avatar {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid #e5e7eb;
                }

                .header-info {
                    display: flex;
                    flex-direction: column;
                }

                .header-name {
                    font-weight: 600;
                    font-size: 16px;
                    margin-bottom: 2px;
                    color: #101828;
                }

                .header-status {
                    font-size: 12px;
                    color: #22c55e;
                    font-weight: 500;
                }

                .chat-header-right {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                .header-icon {
                    width: 20px;
                    height: 20px;
                    cursor: pointer;
                    transition: transform 0.2s ease;
                    opacity: 0.7;
                }

                .header-icon:hover {
                    transform: scale(1.1);
                    opacity: 1;
                }

                .messages-container {
                    flex: 1;
                    padding: 24px;
                    overflow-y: auto;
                    background-color: #f9fafb;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    min-height: 0; /* Fix for flex container */
                }

                .no-messages-container {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    color: #6b7280;
                    padding: 48px 24px;
                }

                .no-messages-icon {
                    font-size: 64px;
                    margin-bottom: 16px;
                    opacity: 0.5;
                }

                .no-messages-container h4 {
                    color: #374151;
                    font-size: 20px;
                    font-weight: 600;
                    margin-bottom: 8px;
                }

                .no-messages-container p {
                    color: #6b7280;
                    font-size: 14px;
                    margin: 0;
                }

                .message {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    animation: slideIn 0.3s ease-out;
                }

                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .message.sent {
                    flex-direction: row-reverse;
                    justify-content: flex-start;
                }

                .message-avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    object-fit: cover;
                    flex-shrink: 0;
                    border: 2px solid #e5e7eb;
                }

                .message-content {
                    display: flex;
                    flex-direction: column;
                    max-width: 70%;
                }

                .message.sent .message-content {
                    align-items: flex-end;
                }

                .message-bubble {
                    padding: 12px 16px;
                    border-radius: 12px;
                    word-wrap: break-word;
                    margin-bottom: 4px;
                    font-size: 14px;
                    line-height: 1.4;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }

                .message.sent .message-bubble {
                    background: linear-gradient(135deg, #101828 0%, #374151 100%);
                    color: white;
                    border-radius: 12px 4px 12px 12px;
                }

                .message.received .message-bubble {
                    background-color: #ffffff;
                    color: #101828;
                    border-radius: 4px 12px 12px 12px;
                    border: 1px solid #e5e7eb;
                }

                .message-bubble.deleted {
                    background-color: #f3f4f6;
                    color: #6b7280;
                    font-style: italic;
                    border: 1px solid #d1d5db;
                }

                .message-time {
                    font-size: 11px;
                    color: #9ca3af;
                    font-weight: 500;
                    margin-top: 2px;
                }

                .message-input-container {
                    display: flex;
                    align-items: center;
                    background-color: #ffffff;
                    padding: 20px 24px;
                    border-top: 1px solid #e5e7eb;
                    gap: 12px;
                    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
                    /* Remove margin to fix empty space issue */
                }

                .message-input {
                    flex: 1;
                    border: 1px solid #d1d5db;
                    outline: none;
                    box-shadow: none;
                    background-color: #f9fafb;
                    padding: 12px 16px;
                    font-size: 14px;
                    color: #374151;
                    border-radius: 12px;
                    transition: all 0.2s ease;
                }

                .message-input:focus {
                    border-color: #101828;
                    background-color: #ffffff;
                    box-shadow: 0 0 0 3px rgba(16, 24, 40, 0.1);
                }

                .message-input::placeholder {
                    color: #9ca3af;
                }

                .input-icon {
                    width: 22px;
                    height: 22px;
                    cursor: pointer;
                    opacity: 0.7;
                    transition: all 0.2s ease;
                }

                .input-icon:hover {
                    opacity: 1;
                    transform: scale(1.1);
                }

                .send-btn {
                    background: linear-gradient(135deg, #101828 0%, #374151 100%);
                    color: white;
                    border: none;
                    border-radius: 10px;
                    padding: 12px 20px;
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: 0 4px 12px rgba(16, 24, 40, 0.15);
                    letter-spacing: 0.5px;
                }

                .send-btn:hover:not(:disabled) {
                    background: linear-gradient(135deg, #374151 0%, #4b5563 100%);
                    transform: translateY(-1px);
                    box-shadow: 0 6px 20px rgba(16, 24, 40, 0.25);
                }

                .send-btn:disabled {
                    background: linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%);
                    cursor: not-allowed;
                    transform: none;
                    box-shadow: none;
                }

                .no-chat-selected {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    color: #6b7280;
                    padding: 48px 24px;
                }

                .no-chat-icon {
                    font-size: 64px;
                    margin-bottom: 16px;
                    opacity: 0.5;
                }

                .no-chat-selected h3 {
                    color: #374151;
                    font-size: 24px;
                    font-weight: 600;
                    margin-bottom: 8px;
                }

                .no-chat-selected p {
                    color: #6b7280;
                    font-size: 16px;
                    margin: 0;
                }

                .loading-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    padding: 32px;
                    color: #6b7280;
                    font-size: 14px;
                }

                .empty-state {
                    text-align: center;
                    color: #6b7280;
                    padding: 32px 20px;
                }

                .search-results {
                    max-height: 300px;
                    overflow-y: auto;
                }

                .search-result-item {
                    display: flex;
                    align-items: center;
                    padding: 12px;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: background-color 0.2s;
                    gap: 12px;
                }

                .search-result-item:hover {
                    background-color: #f3f4f6;
                }

                .search-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    object-fit: cover;
                }

                .search-info {
                    flex: 1;
                }

                .search-name {
                    font-weight: 500;
                    font-size: 16px;
                    margin-bottom: 2px;
                }

                .search-email {
                    font-size: 14px;
                    color: #6b7280;
                }

                /* Mobile Styles */
                @media (max-width: 786px) {
                    .chat-container {
                        padding: 0 !important;
                        align-items: stretch !important;
                        height: 100vh !important;
                        background-color: #ffffff;
                    }

                    .chat-sidebar {
                        width: 100% !important;
                        max-width: 100%;
                        padding: 16px !important;
                        height: 100vh !important;
                    }

                    .chat-window {
                        width: 100% !important;
                        max-width: 100%;
                        height: 100vh !important;
                    }

                    .message-input-container {
                        padding: 16px !important;
                    }

                    .messages-container {
                        padding: 16px !important;
                    }

                    .chat-header {
                        padding: 16px !important;
                    }

                    .sidebar-header {
                        flex-direction: row;
                        gap: 12px;
                        align-items: center;
                    }

                    .user-avatar,
                    .new-chat-btn {
                        width: 40px;
                        height: 40px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Chat;