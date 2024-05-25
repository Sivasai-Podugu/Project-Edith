package com.projects.edith.repositories;

import com.projects.edith.models.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;


@Repository
public interface MessageRepository extends JpaRepository<Message,Integer> {

//    List<Message> findAllBySenderIdAndReceiverIdOrReceiverIdAndSenderIdOrderByTimestamp(Integer id1, Integer id2,Integer id3, Integer id4);

    @Query(nativeQuery = true,
            value = "SELECT * FROM messages WHERE (sender_id = :id1 AND receiver_id = :id2) OR (sender_id = :id2 AND receiver_id = :id1) ORDER BY timestamp ")
    List<Message>findMessagesByUserIds(@Param("id1") Integer id1, @Param("id2") Integer id2);
    @Query("SELECT m FROM Message m WHERE (m.senderId = :senderId AND m.receiverId = :receiverId) OR (m.senderId = :receiverId AND m.receiverId = :senderId) ORDER BY m.timestamp DESC ")
    Page<Message> findLastMessage(@Param("senderId") Integer senderId, @Param("receiverId") Integer receiverId, Pageable pageable);
}
